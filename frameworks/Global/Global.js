const Framework = require('../Framework');

const {global} = require('../../lib/helper');
const {api} = require('../../lib/api');
const {browser} = require('../../lib/url');
const chalk = require('chalk');

//Inquire elements
const Login = require('./prompt/Login');
const SelectProject = require('../SelectProject');
const {ConfigWriter} = require('../ConfigStart');

class Global extends Framework{

    /**
     * Log in to barada
     * @param commands
     * @param options
     * @param files
     * @returns {Promise<void>}
     */
    async login(commands, options, files) {
        const user = api.user();

        if(!user || !user.token){
            console.log(chalk.cyan('[INFO]')+' Log into your Barada account!');
            console.log('\n\tIf you don\'t have one yet, create yours by running: '+chalk.cyan('barada signup')+'\n');
        }
        else {
            console.log(chalk.yellow('[WARN]')+' You will be logged out.');
            console.log('\n\tYou are already logged in as '+chalk.yellow(user.email)+'! Prompting for new credentials.\n');
            console.log('\tUse '+chalk.yellow('Ctrl+C')+' to cancel and remain logged in.\n')
        }

        let credentials = await this.prompt(Login);

        const load = this.load('Authentication');

        api.login(credentials).then((rsp) => {
            load.stop();
            console.log('');
            if(rsp.check)
                console.log(chalk.green('[success]')+' You are logged in!');
            else
                console.log(chalk.red('[error]')+' These credentials do not match our records.');
        });

    }

    /**
     * log out of barada
     * @param commands
     * @param options
     * @param files
     */
    logout(commands, options, files){
        const load = this.load('Log out of Barada');
        api.logout().then((data) => {
            load.stop();
            console.log(chalk.green('[ok]')+' You are logged out.');
        }).catch(error => {
            load.stop();
            if(error.response.status === 401)
                console.log(chalk.red('[error]')+' You are already logged out.')
        });
    }

    /**
     * Open miridoo sign up link with the default browser
     * @param commands
     * @param options
     * @param files
     * @returns {Global}
     */
    signup(commands, options, files){
        browser.signup();
        return this;
    }

    /**
     * Open barada docs link with the default browser
     * @param commands
     * @param options
     * @param files
     * @returns {Global}
     */
    docs(commands, options, files){
        browser.docs();
        return this;
    }

    /**
     * the user projects list
     * @param commands
     * @param options
     * @param files
     */
    projects(commands, options, files){
        if(api.logged()){
            const load =  this.load('Load project list');
            api.projects().then(projects => {
                load.stop();
            })
            .catch(error => {
                load.stop();
                console.log(error);
            });
        }
        else{
            console.log(chalk.red('[error]')+' You are not logged.')
        }
    }

    start(commands, options, files){
        const load = this.load('');

        api.projects().then(async (projects) => {
            load.stop();
            if(projects.length){
                const data = await this.prompt(SelectProject(projects, true));

                if(data.project){
                    data.folder = data.folder.trim();
                    const configs = ConfigWriter(data);
                    const load =  this.load('Request export and download files');
                    console.log('');
                    this.download(data).then((info) => {
                        load.stop();
                        console.log('');
                        configs.ref = info.activity.id;
                        files.save(data.folder+'/barada.json', JSON.stringify(configs, null, 4));
                        if(configs && configs.resources){
                            let index = 0;
                            let install = () => {
                                let resource = configs.resources[index];
                                if(resource){
                                    const framework = this.framework(resource.name.toLowerCase());

                                    if(framework){
                                        let cwd = resource.name.toLowerCase();
                                        let loptions = {console: options, resource: {configs: configs, folder: cwd}};

                                        //Update the folder name in the config file
                                        resource.folder = loptions.folder;

                                        //Create and install the resource
                                        let instance = (new framework);
                                        instance.create(resource, loptions, files).then((path) => {
                                            files.save(data.folder+'/'+cwd+'/barada.json', JSON.stringify({
                                                type : 'resource',
                                                id : resource.id,
                                                project : data.project.id,
                                                name : resource.name,
                                                ref : info.activity.id
                                            }, null, 4));

                                            console.log(chalk.cyan('[INFO] Installation of Barada files for '+resource.name+'!'));
                                            instance.sync(info.path+'/'+cwd, loptions.cwd, files, false);
                                            instance.afterCreate(resource, loptions, files).then((out) => {
                                                console.log(out)
                                                index++;
                                                install();
                                            }).catch((err) => {});
                                        });

                                    }
                                    else {
                                        console.log(chalk.red('[Error]')+' '+resource.name+' manager is not available for the current cli.');
                                        index++;
                                        install();
                                    }
                                }
                                else{
                                    //TODO : we are done here
                                }
                            };
                            install();
                        }
                    });
                }
            }
            else{
                console.log(chalk.cyan('[INFO] please create and configure project before'))
            }
        })
        .catch((error) => {
            load.stop();
            console.log(error);
        })
    }

    pull (commands, options, files) {
        if(files.exists('barada.json')){
            let barada = files.get('barada.json');

            api.pull(barada.project.id, barada.ref).then((data) => {
                barada.ref = data.activity.id;
                files.save('barada.json', JSON.stringify(barada, null, 4));
                if(barada.resources){
                    let index = 0;
                    let update = () => {
                        let resource = barada.resources[index];
                        if (resource) {
                            const framework = this.framework(resource.name.toLowerCase());
                            let instance = (new framework), cwd = resource.name.toLowerCase();
                            let option = {console: options, resource: {configs: barada, folder: cwd}, cwd: files.cwd(cwd)};

                            // update local config file
                            let BaradaLocal = files.get(cwd+'/barada.json');
                            BaradaLocal.ref = data.activity.id;
                            files.save(cwd+'/barada.json', JSON.stringify(BaradaLocal, null, 4));

                            let logs = [];

                            instance.sync(data.path+'/'+cwd, files.cwd(cwd), files, true, logs);

                            if(logs.length > 0) {
                                logs.forEach((state) => console.log(state));

                                // TODO : check removed files

                                instance.afterPull(resource, option, files).then((out) => {
                                    console.log(out)
                                    index++;
                                    update();
                                }).catch((error) => {
                                    console.log(error)
                                });
                            }
                            else {
                                index++;
                                update();
                                console.log(chalk.cyan(resource.name)+' : Already up to date.')
                            }
                        }
                        else{
                            //TODO : we aree done here
                        }
                    };

                    update();
                }
            }).catch((error) => { console.log(error); })
        }
        else {
            this.noCommand('pull');
        }
    }

    download(data) {
        return new Promise((resolve, reject) => {
            // TODO use api to download file
            const progress = this.progress('Downloading : ', 10);
            api.build(data.project.id, null, progress).then((info) => {
                progress.to(100);
                resolve(info);
            });
        });
    }

    test(commands, options, files){
        files.copy(process.cwd()+'/Compressed', process.cwd()+'/destination');
    }

    sync(source, destination, params){

    }

    /**
     * check if the command is the global command
     * @param files
     * @param command
     * @returns {*}
     */
    static inspector(files, command) {
        return global[command]
    }

}


module.exports = Global;
