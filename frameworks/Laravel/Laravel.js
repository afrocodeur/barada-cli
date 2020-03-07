var Framework = require('../Framework');
var chalk = require('chalk');

const EnvConf = require('./prompt/Env')

module.exports = class Laravel extends Framework{

    constructor() {
        super();
        this.filters = [
            /^(\/app\/)/,
            /^(\\app\\)/,
            /\.gitignore$/
        ];
    }

    async init(){
        // const response = await this.prompt(exemple)
        // console.log(response)
    }

    static inspector(files){
        if(files.composer()){
            let composer = files.composer(true);

            if(composer.name === "laravel/laravel"){
                return true;
            }
        }

        return false
    }

    configs(){
        return {
            scripts : {
                start : 'php artisan serve',
                port : ''
            }
        }
    }

    create (resource, options, files) {
        resource.env = this.env(resource.params);
        return new Promise((resolve, reject) => {
            console.log(chalk.cyan('[INFO] Laravel Installation'));
            // check if composer is available
            this.exec('composer').then(stdout => {
                const command = 'composer create-project --prefer-dist laravel/laravel '+options.resource.folder;
                let load =  this.load(chalk.green(command));
                const subfolder = options.resource.configs.folder;

                // lunch laravel installation
                this.exec(command, {
                    cwd : files.cwd(subfolder)
                }).then(stdout => {
                    load.stop();
                    console.log(stdout);
                    console.log(chalk.cyan('[INFO] Installation done with success!'));

                    options.cwd = files.cwd(subfolder+'/'+options.resource.folder);

                    this.barada(resource, options, files).then(resolve).catch(reject);

                }).catch(error => load.stop());

            }).catch(error => {});
        });
    }

    barada (resource, options, files) {
        return new Promise((resolve, reject) => {
            let load = this.load('Update environment to import barada file');

            // update composer file
            const file = options.cwd+'/composer.json';
            let composer = require(file);

            if(composer.autoload && composer.autoload['psr-4']){
                composer.keywords.push("Barada");
                composer.autoload['psr-4']['Barada\\'] = 'barada/';
                composer.autoload.files = ["app/helpers.php"];
            }

            files.save(options.cwd+'/app/helpers.php', '<?php ', false);

            files.save(file, JSON.stringify(composer, null, 4), false);

            const cmdOptions = { cwd : options.cwd };

            this.exec('composer require fruitcake/laravel-cors', cmdOptions).then(() => {
                this.exec('composer dump-autoload', cmdOptions).then(async (stdout) => {
                    load.stop();
                    const answers = await this.prompt(EnvConf(resource.env), resource.env);

                    try{
                        // TODO : configure the .env file
                        if(answers.config === 'yes'){
                            let env  = files.get(options.cwd+'/.env', false).split('\n').map((line) => {
                                const kvalue = line.split('=');
                                const lkey = kvalue[0].trim(); // get the line key

                                for(let key in answers){
                                    if(lkey === key){
                                        kvalue[1] = answers[key];
                                        break;
                                    }
                                }
                                return kvalue.join('=');
                            });
                            files.save(options.cwd+'/.env', env.join('\n'), false);
                        }

                        const userfile = options.cwd+'/app/'+resource.params['laravel-model-folder']+'/User.php',
                            routefile = options.cwd+'/routes/web.php',
                            apifile = options.cwd+'/routes/api.php',
                            authfile = options.cwd+'/config/auth.php';

                        // if Laravel model folder changed
                        if(resource.params['laravel-model-folder']){
                            const modelfolder = options.cwd+'/app/'+resource.params['laravel-model-folder'];
                            // Create the Model folder
                            !files.fs.existsSync(modelfolder) && files.fs.mkdirSync(modelfolder);

                            // move the User.php file
                            files.move(options.cwd+'/app/User.php', userfile).then(error => {
                                // update the configs/auth.php file
                                let auth = files.get(authfile, false)
                                    .replace(/'model' => App\\User::class,/, "'model' => App\\"+resource.params['laravel-model-folder']+"\\User::class,");

                                let user = files.get(userfile, false)
                                    .replace(/namespace App;/, "namespace App\\Models;");


                                files.save(authfile, auth, false);

                                files.save(userfile, user, false);
                            });
                        }
                        // Web Routes From Barada
                        {
                            let comment = "/*\n" +
                                "|--------------------------------------------------------------------------\n" +
                                "| Web Routes From Barada\n" +
                                "|--------------------------------------------------------------------------\n" +
                                "*/";

                            let route = files.get(routefile, false)
                                .replace(/<\?php/, "<?php\n\n"+comment+"\ninclude(__DIR__.'/barada.php');\n\n");

                            files.save(routefile, route, false);
                        }

                        // if(['on', true, 'yes'].indexOf(resource.params['laravel-api']) >= 0)
                        // API Routes From Barada
                        {
                            let comment = "/*\n" +
                                "|--------------------------------------------------------------------------\n" +
                                "| API Routes From Barada\n" +
                                "|--------------------------------------------------------------------------\n" +
                                "*/";
                            let api = files.get(apifile, false)
                                .replace(/<\?php/, "<?php\n\n"+comment+"\ninclude(__DIR__.'/api.barada.php');\n\n");

                            files.save(apifile, api, false);
                        }

                        resolve();

                        // TODO : check the export code from barada
                    }catch(e){
                        reject(e);
                    }

                }).catch((stderr) => { load.stop() });
            }).catch((stderr) => { load.stop() });;

        });
    }

    sync(source, destination, files, filter = false, logs = null){
        // remove default migrate files
        if(!filter){ files.removeDir(destination+'/database/migrations', true); }

        files.copy(source, destination, filter ? this.copyFileFilter.bind(this) : null, {source, to: destination, logs});
    }

    envAssoc(){
        return {
            "laravel-env-app_url": "APP_URL",
            "laravel-env-api_url": "APP_API_URL",
            "laravel-env-db_host": "DB_HOST",
            "laravel-env-db_port": "DB_PORT",
            "laravel-env-db_database": "DB_DATABASE",
            "laravel-env-db_username":"DB_USERNAME",
            "laravel-env-db_password":"DB_PASSWORD"
        }
    }

    afterCreate(resource, loptions, files) {
        return new Promise((resolve, reject) => {
            this.exec('composer require doctrine/dbal', {cwd: loptions.cwd}).then((out) => {

                this.exec('composer dump-autoload', {cwd: loptions.cwd})
                .then((out) => {
                    this.exec('php artisan migrate --seed', {cwd: loptions.cwd}).then(resolve).catch((error)=>{ console.log(error); });
                }).catch((error)=>{ console.log(error); });

            }).catch(error => { console.log(error); });
        })
    }

    afterPull(resource, loptions, files) {
        return new Promise((resolve, reject) => {

            this.exec('composer dump-autoload', {cwd: loptions.cwd})
                .then((out) => {
                    this.exec('php artisan migrate --seed', {cwd: loptions.cwd}).then(resolve).catch((error)=>{ console.log(error); });
                }).catch((error)=>{ console.log(error); });
        });
    }
};
