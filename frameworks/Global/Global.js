const chalk = require('chalk');
const moment = require('moment');

const Framework = require('../Framework');

const {global} = require('../../lib/helper');
const {api} = require('../../lib/api');
const {browser} = require('../../lib/url');

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

        return new Promise((resolve, reject) => {
            api.login(credentials).then((rsp) => {
                load.stop();
                console.log('');
                if(rsp.check)
                    console.log(chalk.green('[success]')+' You are logged in!');
                else
                    console.log(chalk.red('[error]')+' These credentials do not match our records.');

                resolve(rsp);
            }).catch(reject);
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

    async installResources(folder, configs, options, files,  resources) {
        let save = (config) => files.save(folder+'/barada.json', JSON.stringify(config, null, 4));

        const load =  this.load('Request export and download files');
        console.log('');
        return new Promise((resolve, reject) => {
            this.download(configs).then((info) => {
                load.stop();
                console.log('');
                configs.ref = info.activity.id;
                save(configs);
                resources = resources || configs.resources;
                if(configs && resources){
                    let index = 0;
                    let install = () => {
                        let resource = resources[index];
                        if(resource){
                            this.installResource(folder, info, configs, resource, options, files).then(rsp => { save(configs); index++; install()}).catch(err => {console.log(err); index++; install();})
                        }
                        else{
                            //TODO : we are done here
                            files.removeDir(info.path)
                            console.log(chalk.green('DONE !'));
                            resolve({save})
                        }
                    };
                    install();
                }
            });
        })
    }
    async installResource(folder, info, configs, resource, options, files) {
        return new Promise((resolve, reject) => {
            const framework = this.framework(resource.name.toLowerCase());

            if(framework){
                let cwd = resource.name.toLowerCase();
                let loptions = {console: options, resource: {configs: configs, folder: cwd}, folder: folder};

                //Update the folder name in the config file

                //Create and install the resource
                let instance = (new framework);
                instance.create(resource, loptions, files).then((path) => {
                    resource.folder = loptions.resource.folder;
                    cwd = loptions.resource.folder;
                    loptions.cwd = (folder?folder+'/':'')+cwd;
                    resource.folder = cwd;

                    console.log(chalk.cyan('[INFO] Installation of Barada files for '+resource.name+'!'));
                    instance.sync(info.path+'/'+resource.name.toLowerCase(), (folder?folder+'/':'')+cwd, files, false);
                    let LocalBarada = {type : 'resource', id : resource.id, project : configs.project.id, name : resource.name, ref : info.activity.id}
                    instance.afterCreate(resource, loptions, files).then((out) => {
                        console.log(out)
                        LocalBarada.date = moment().format();
                        files.save(folder+'/'+cwd+'/barada.json', JSON.stringify(LocalBarada, null, 4));
                        resolve();
                    }).catch((err) => {
                        LocalBarada.date = moment().format();
                        files.save(folder+'/'+cwd+'/barada.json', JSON.stringify(LocalBarada, null, 4));
                        reject('');
                    });
                });
            }
            else {
                console.log(chalk.red('[Error]')+' '+resource.name+' manager is not available for the current cli.');
                reject();
            }
        });
    }

    /**
     *
     * @param commands
     * @param options
     * @param files
     * @return {Promise<void>}
     */
    async start(commands, options, files){
        // console.log(options)
        if(!(await this.attenpt())) return;

        const load = this.load('');

        api.projects().then(async (projects) => {
            load.stop();
            if(projects.length){
                let data = null;
                if(options.project){
                    for (let index in projects) {
                        let project = projects[index];
                        if((parseInt(project.id) === parseInt(options.project)) || (options.project === project.name)){
                            data =  {project: project};
                            break;
                        }
                    }
                }
                if(!data){
                    data = await this.prompt(SelectProject(projects, true));
                }
                else{
                    data.folder = options.folder || data.project.name.toLowerCase()
                    data.resources = data.project.resources.filter(item => item.type === 'framework');
                }

                if(data.project && data.folder){
                    data.folder = data.folder.trim();
                    const configs = ConfigWriter(data);
                    this.installResources(configs.folder, configs, options, files).then(rsp => (rsp));
                }
                else {
                    console.log(chalk.red('[ERROR]')+' please make sure you done well your project configuration.');
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

    /**
     *
     * @param commands
     * @param options
     * @param files
     */
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
                            let instance = (new framework), cwd = (resource.folder || resource.name).toLowerCase();
                            let option = {console: options, resource: {configs: barada, folder: cwd}, cwd: files.cwd(cwd)};

                            console.log('');
                            console.log(chalk.cyan('[INFO] '+resource.name+' update'));

                            // update local config file
                            let BaradaLocal = files.get(cwd+'/barada.json'), lastMoment = BaradaLocal.date ? moment(BaradaLocal.date) : null;
                            BaradaLocal.ref = data.activity.id;
                            BaradaLocal.date = moment().format();
                            let logs = [];

                            instance.sync(data.path+'/'+resource.name.toLowerCase(), files.cwd(cwd), files, true, logs, lastMoment);


                            if(logs.length > 0) {
                                logs.forEach((state) => console.log(state));

                                // TODO : check removed files

                                instance.afterPull(resource, option, files).then((out) => {
                                    console.log(out);
                                    index++;
                                    files.save(cwd+'/barada.json', JSON.stringify(BaradaLocal, null, 4));
                                    update();
                                }).catch((error) => {
                                    console.log(error);
                                    files.save(cwd+'/barada.json', JSON.stringify(BaradaLocal, null, 4));
                                });
                            }
                            else {
                                index++;
                                console.log(chalk.cyan(resource.name)+' : Already up to date.')
                                files.save(cwd+'/barada.json', JSON.stringify(BaradaLocal, null, 4));
                                update();
                            }
                        }
                        else{
                            //TODO : we aree done here
                            files.removeDir(data.path);
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

    resourcesFormat(resources){
        return resources.map(resource => {
            let values = {};

            try{
                values = JSON.parse(resource.pivot.params);
            }catch (e) { }

            return {
                id : resource.id,
                name : resource.name,
                params : values
            };
        });
    }

    async update(commands, options, files){
        if(!(await this.attenpt())) return;
        const load = this.load('check configuration');

        if(files.exists('barada.json')) {
            let baradaInit = files.get('barada.json');
            let barada = files.get('barada.json');
            let ids = [];
            barada.resources.forEach(resource =>  ids.push(resource.id));

            api.project(barada.project.id).then(project => {
                let resources = [];
                project.resources.forEach(resouce => {
                    if(ids.indexOf(resouce.id) < 0){
                        resources.push(resouce);
                    }
                });

                load.stop();

                if(resources.length){
                    resources = this.resourcesFormat(resources);
                    barada.resources = barada.resources.concat(resources);

                    this.installResources('', barada, options, files, resources).then(rsp => {
                        rsp.save(barada);
                    }).catch(console.log);
                }
                else{
                    console.log(chalk.cyan('[INFO] nothing to update'))
                }
            }).catch(error => console.log(error));


        }
        else {
            this.noCommand('update');
        }

    }

    async serve(commands, options, files) {
        let barada = files.get('barada.json');
        if(barada.resources){
            barada.resources.forEach(resource => {
                let framework = this.framework(resource.name.toLowerCase());
                if(framework){
                    framework = new framework();
                    console.log(resource.name);
                    resource.cwd = files.cwd(resource.folder);
                    framework.serve(resource);
                }
            });
        }
    }

    /**
     *
     * @param data
     * @return {Promise<any>}
     */
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

    /**
     *
     * @param commands
     * @param options
     * @param files
     */
    test(commands, options, files){
        files.copy(process.cwd()+'/Compressed', process.cwd()+'/destination');
    }

    /**
     *
     * @param source
     * @param destination
     * @param params
     */
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
