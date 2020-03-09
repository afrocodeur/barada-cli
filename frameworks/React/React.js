var Framework = require('../Framework');
var chalk = require('chalk');

var WebPackInstaller = require('./installer/WebPackInstaller')
var RACInstaller = require('./installer/RACInstaller')

var assoc_env = {

};

module.exports = class React extends Framework{

    constructor() {
        super();
        this.filters = [
            /^(\/src\/app\/)/,
            /^(\/src\/routes\/AppRoutes.js)/,
            /\.gitignore$/
        ];
    }

    async init(){
        // const response = await this.prompt(exemple)
        // console.log(response)
    }

    static inspector(files){
        let file = files.get('package.json', true);

        // if(file.name === "laravel/laravel"){
        //     return true;
        // }
    }

    create (resource, options, files) {
        return new Promise((resolve, reject) => {
            options.resource.folder = 'react-js';
            resource.params['react-state_manager'] = resource.params['react-state_manager'] || 'mobx';

            let manager = resource.params['react-package_manager'];
            console.log(chalk.cyan('[INFO] React Installation'));
            let install = null;

            // if(resource.params['react-installer'] === 'webpack'){
            //     console.log(chalk.cyan('[USE] Webpack'));
            //     install = WebPackInstaller.install.apply(this, [resource, options, files]);
            // }
            if(resource.params['react-installer'] === 'cra'){
                console.log(chalk.cyan('[USE] Create React App'));
                install = RACInstaller.install.apply(this, [resource, options, files]);
            }

            install.then(() => {
                resolve();
            });

        });
    }

    barada (resource, options, files) {
        return new Promise((resolve, reject) => {
            let load = this.load('Update environment to import barada file');
        });
    }

    sync(source, destination, files, filter = false, logs = null){
        // remove default migrate files
        if(!filter){

        }


        if(files.exists(source, false))
            files.copy(source, destination, filter ? this.copyFileFilter.bind(this) : null, {source, to: destination, logs});
        else {
            console.log(chalk.yellow('[WARN]')+' No available resource');
        }
    }


    afterCreate(resource, loptions, files) {
        let options = {cwd: loptions.cwd};
        return new Promise((resolve, reject) => {
            console.log(chalk.cyan('[INFO] Add '+resource.params['react-state_manager']));
            let store = resource.params['react-state_manager'];
            let requirements = 'moment axios node-sass';

            if(resource.params['react-lang_manager'] === 'react-multi-lang'){

            }
            else {
                requirements += ' react-i18next i18next';
            }

            if(store === 'redux'){

            }
            else {
                store = 'mobx-react mobx';
            }
            console.log(chalk.cyan('[INFO] Add requirements'));
            console.log(requirements)

            this.exec('yarn add '+requirements, options).then(stdout => {
                this.exec('yarn add '+(store), options).then(stdout => {
                    console.log(chalk.cyan('[INFO] Add react router dom'));
                    this.exec('yarn add react-router-dom', options).then(stdout => {
                        ['App.js', 'App.css', 'App.test.js', 'logo.svg'].forEach(item => files.remove(loptions.cwd+'/src/'+item, true));
                        resolve('');
                    });
                });
            });


        })
    }

    afterPull(resource, loptions, files) {
        return new Promise((resolve, reject) => {
            resolve('');
        });
    }

};
