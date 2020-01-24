var Framework = require('../Framework');
var chalk = require('chalk');

const EnvConf = require('./prompt/Env')


module.exports = class Laravel extends Framework{


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


    create (resouce, options, files) {
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

                    this.barada(resouce, options, files).then(resolve).catch(reject);

                }).catch(error => load.stop());

            }).catch(error => {});
        });
    }

    barada (resouce, options, files) {
        return new Promise((resolve, reject) => {
            let load = this.load('Update environment to import barada file');

            // update composer file
            const file = options.cwd+'/composer.json';
            let composer = require(file);

            if(composer.autoload && composer.autoload['psr-4']){
                composer.keywords.push("Barada");
                composer.autoload['psr-4']['Barada\\'] = 'barada/';
            }

            files.save(file, JSON.stringify(composer, null, 4), false);

            this.exec('composer dump-autoload', {
                cwd : options.cwd
            }).then(async (stdout) => {
                load.stop();
                const answers = await this.prompt(EnvConf);

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

                    const userfile = options.cwd+'/app/'+resouce.params['laravel-model-folder']+'/User.php',
                        routefile = options.cwd+'/routes/web.php',
                        apifile = options.cwd+'/routes/api.php',
                        authfile = options.cwd+'/config/auth.php';

                    // if Laravel model folder changed
                    if(resouce.params['laravel-model-folder']){
                        const modelfolder = options.cwd+'/app/'+resouce.params['laravel-model-folder'];
                        // Create the Model folder
                        !files.fs.existsSync(modelfolder) && files.fs.mkdirSync(modelfolder);

                        // move the User.php file
                        files.move(options.cwd+'/app/User.php', userfile).then(error => {
                            // update the configs/auth.php file
                            let auth = files.get(authfile, false)
                                .replace(/'model' => App\\User::class,/, "'model' => App\\"+resouce.params['laravel-model-folder']+"\\User::class,");

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

                    // if(['on', true, 'yes'].indexOf(resouce.params['laravel-api']) >= 0)
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
        });
    }

    sync(source, destination, files, filter = false, logs = null){
        // remove default migrate files
        if(!filter){ files.removeDir(destination+'/database/migrations', true); }

        files.copy(source, destination, filter ? this.copyFileFilter : null, {source, to: destination, logs});
    }

    copyFileFilter(directpath, stat, infos, files) {
        if(stat.isDirectory()) return true;
        if(!files.exists(infos.to+infos.relative, false)) {
            if(infos.logs){
                infos.logs.push(chalk.green('add '+infos.relative));
            }
            return true;
        }

        let regex = [
            /^(\/app\/)/,
            /^(\\app\\)/,
            /\.gitignore$/
        ];

        for(let reg of regex){
            if(reg.test(infos.relative))
                return false;
        }
        // if(/^(\/app\/Http\|\/app\/Http\/\/Models)/.test(infos.relative) || /\.gitignore$/.test(infos.relative)) return false;

        let code = files.read(directpath, false), old = files.read(infos.to+infos.relative, false);
        if(code === old) return false;

        if(infos.logs){
            infos.logs.push(chalk.cyan('update '+infos.relative));
        }

        return true;
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
                    this.exec('php artisan migrate', {cwd: loptions.cwd}).then(resolve).catch((error)=>{ console.log(error); });
                }).catch((error)=>{ console.log(error); });
        });
    }

};
