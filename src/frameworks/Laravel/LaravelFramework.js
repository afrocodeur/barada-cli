const Framework = require('../../abstracts/Framework');
const Console = require('../../commands/Console');
const File = require('../../utils/File');
const EnvFile = require('../../utils/EnvFile');
const LaravelSync = require('./LaravelSync');
const EnvPrompt = require('./prompts/EnvPrompt');
const EnvValuePrompt = require('./prompts/EnvValuePrompt');
const MigrationPrompt = require('./prompts/MigrationPrompt');

class LaravelFramework extends Framework{
    static Framework = 'laravel';

    Framework_NAME = 'laravel';
    Framework_FOLDER = 'laravel';


    async install(resource, data) {
        try {
            const version = (/[0-9]+\./g.test(resource.params.version)) ? '"'+resource.params.version+'"' : '';
            Console.info('-- Start laravel installation');

            let response = await this.command.exec('composer', 'create-project laravel/laravel ' + resource.name.toLowerCase() +(version ? ' '+version : ''), {
                cwd: File.path(data.folder )
            });

            Console.info('-- End of laravel installation');
        }catch (e) {
            e.message ? Console.error(e.message) : null;
        }
    }
""
    async init(resource, data) {
        Console.info('-- Start laravel requirement installation');

        const folder = data.path || (data.folder + '/'+resource.name.toLowerCase() + '/');
        this.location = File.path(folder);
        const barada_folder = this.cacheFolder();

        File.write(folder.concat('barada.json'), {barada: true});

        if(File.exists(folder.concat('.gitignore'))) {
            File.writeInto(folder.concat('.gitignore'), '/.barada');
            Console.warning('.gitignore was updated');
        }

        await this.requirements();
        await this.downloadFiles(resource, data, folder, barada_folder, 'build',true);

        Console.info('-- End of laravel requirement installation');
        return {};
    }

    async pull(location, reset) {
        this.location = this.location || location;
        let configs = this.configs();
        await this.downloadFiles(
            {id: configs.id},
            {project: {id: configs.project}, ref: configs.ref},
            this.location, this.cacheFolder(),
            (reset === true ? 'reset' : 'pull'),
            false
        );

        return {};
    }

    async reset(location = null) {
        File.rmDir('database/migrations/barada', true);
        File.rmDir('barada', true);
        return await super.reset(location);
    }

    async updateComposer() {
        const path = this.location.concat('/composer.json');
        let composer = File.getJson(path);

        if(composer.autoload && composer.autoload['psr-4']){
            composer.keywords.push("Barada");
            composer.autoload['psr-4']['Barada\\'] = 'barada/';
        }

        File.write(path, composer);
    }

    async downloadFiles(resource, data, folder, barada_folder, action, env) {
        try {
            let {stream, extract_to, path} = await this.download(resource, data, barada_folder, action);
            await this.merge(extract_to.concat('/'+this.Framework_NAME), folder, resource, data);
            if(env === true) { await this.env(resource); }
            await this.execute();
            await this.saveConfigFile({
                id: resource.id,
                ref: resource.build.id,
                prod: resource.build.id,
                project: data.project.id,
                date: (new Date()).toISOString()
            });

            File.rmDir(extract_to, true);
            return {extract_to, path}
        }catch (e) {
            Console.error(e.message);
        }
    }

    async requirements() {
        try {
            await this.updateComposer();
            // const load = this.command.load('Packages installation');
            await this.command.exec('composer', 'require doctrine/dbal barada/laravel', {cwd: this.location});
            await this.command.exec('composer', 'dump-autoload', {cwd: this.location});
            // load.stop();
        }catch (e) {
            console.log(e.message);
        }
    }

    async env(resource) {
        let env = new EnvPrompt();
        let answer = await env.prompt();

        if(answer.check()) {
            let location = this.location.concat('/', '.env');
            let env = new EnvFile(location);
            let data = env.json();
            if(answer.online()) {
                if(resource.env) {
                    for(let key in resource.env) {
                        if(resource.env[key]) {
                            data[key] = resource.env[key];
                        }
                    }
                }
            }
            else {
                let params = {
                    database: ['DB_HOST', 'DB_PORT', 'DB_DATABASE', 'DB_USERNAME', 'DB_PASSWORD'],
                    mails: ['MAIL_MAILER', 'MAIL_HOST', 'MAIL_PORT', 'MAIL_USERNAME', 'MAIL_PASSWORD', 'MAIL_ENCRYPTION', 'MAIL_FROM_ADDRESS', 'MAIL_FROM_NAME']
                };

                let question = await this.command.confirm('Do you want to configure the database ?');
                let prompt = new EnvValuePrompt([], data);
                if(question.check()) {
                    prompt.set(params.database);
                    (await prompt.prompt()).merge();
                }

                question = await this.command.confirm('Do you want to configure the mail ?');
                if(question.check()) {
                    prompt.set(params.mails);
                    (await prompt.prompt()).merge();
                }
            }
            env.merge(data).save();
        }
    }

    async execute() {
        let answer = new MigrationPrompt();
        //TODO : ask if user want to launch migration or seed or both
        let migration = await answer.prompt();
        if(migration.check()) {
            let args = '';
            if(migration.all()) {
                args = 'migrate --path="database/migrations/barada" --seed';
            }
            else if(migration.migrate()) {
                args = 'migrate --path="database/migrations/barada"';
            }
            else if(migration.seed()) {
                args = 'db:seed';
            }

            try{
                let answer = await this.command.exec('php', 'artisan '+args, {cwd: this.location});
            }
            catch (e){
                console.log(e.message);
            }
        }
    }

    async merge(source, to, resource, data) {
        try {
            let sync = new LaravelSync();
            sync.sync(source, to);

            if(sync.added > 0 || sync.updated > 0 || sync.removed > 0) {
                if(sync.added > 0) {
                    Console.warning(sync.added + ' file(s) added to your project');
                }
                if(sync.updated > 0) {
                    Console.info(sync.updated + ' file(s) are updated on your project');
                }
            }
            else {
                Console.success('Your project is already up to date')
            }
        }catch (e) {
            Console.error(e.message);
        }
    }
}

module.exports = LaravelFramework;
