const chalk = require('chalk');
const moment = require('moment');

const Framework = require('../Framework');

const {global} = require('../../lib/helper');
const {api} = require('../../lib/api');
const {browser} = require('../../lib/url');

class Global extends Framework{

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

    toResource(barada) {
        return {id: barada.id, name: barada.name, params: {}, folder: barada.name, resource: true};
    }

    /**
     *
     * @param folder
     * @param configs
     * @param options
     * @param files
     * @param resources
     * @return {Promise<*>}
     */
    async installResources(folder, configs, options, files,  resources) {
        let save = (config) => files.save(folder+'/barada.json', JSON.stringify(this.cleanResource(config), null, 4));

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

    /**
     *
     * @param folder
     * @param info
     * @param configs
     * @param resource
     * @param options
     * @param files
     * @return {Promise<*>}
     */
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
        if(!(await this.attenpt(commands, options, files))) return;

        this.selectProject(commands, options, files, {create: true}).then(project => {
            var configs = project.configs;
            this.installResources(configs.folder, configs, options, files).then(rsp => (rsp));
        }).catch(error => { console.log(error) });
    }

    async reset(commands, options, files, isResource){
        if(files.exists('barada.json')) {
            let barada = files.get('barada.json');
            options.reset = true;

            if(isResource){
                barada.ref = 0;
                let resource = this.toResource(barada);
                this.resetResource(resource, files).then(out => {
                    files.save('barada.json', JSON.stringify(barada, null, 4));
                    this.pull(commands, options, files, isResource);
                }).catch(error => {  })
            }
            else if(barada.resources){
                barada.ref = 0;
                let index = 0;
                let reset = () => {
                    let resource = barada.resources[index];
                    index++;
                    if (resource) {
                        this.resetResource(resource, files).then(out => {
                            reset();
                        }).catch(error => { reset(); })
                    }
                    else{
                        files.save('barada.json', JSON.stringify(this.cleanResource(barada), null, 4));
                        this.pull(commands, options, files, isResource);
                    }
                };

                reset();
            }
        }
        else{
            this.noCommand('reset');
        }
    }

    resetResource(resource, files) {
        return new Promise((resolve, reject) => {
            const framework = this.framework(resource.name.toLowerCase());
            let instance = (new framework),
                cwd = resource.resource ? '' : (resource.folder || resource.name).toLowerCase();

            if(instance.reset){
                instance.reset(files.cwd(cwd), files).then(() => {
                    resolve();
                }).catch(() => {
                    resolve();
                });
            }
            else{
                this.noCommand(chalk.blue("reset")+' for '+resource.name, false);
            }
        })
    }

    /**
     *
     * @param barada
     */
    cleanResource(barada){
       for(let i in barada.resources){
           let item = barada.resources[i];
           if(item.env){
               item.params = item.env;
               delete item.env;
           }
       }
       return barada;
    }
    /**
     *
     * @param commands
     * @param options
     * @param files
     * @param isResource
     */
    pull (commands, options, files, isResource) {
        if(files.exists('barada.json')){
            let barada = files.get('barada.json');
            let data = {};

            if (options.tag) {
                data.reset = options.reset;
                data.tag = true;
            }

            api.pull((isResource ? barada.project : barada.project.id), (!options.clean ? barada.ref : 0), null, null, data).then((data) => {
                barada.ref = data.activity.id;
                files.save('barada.json', JSON.stringify(barada, null, 4));
                if(isResource){
                    let cwd = '';
                    let option = {console: options, resource: {configs: barada, folder: cwd}, cwd: files.cwd(cwd)};
                    let resource = this.toResource(barada);

                    this.updateResource(resource, files, option, data).then(done => {
                        files.removeDir(data.path);
                    }).catch(error => { console.log(error); });
                }
                else if(barada.resources){
                    let index = 0;
                    let update = () => {
                        let resource = barada.resources[index];
                        if (resource) {
                            let cwd = (resource.folder || resource.name).toLowerCase();
                            let option = {console: options, resource: {configs: barada, folder: cwd}, cwd: files.cwd(cwd)};

                            this.updateResource(resource, files, option, data).then(done => {
                                index++;
                                update();
                            }).catch(error => {
                                console.log(error);
                                update();
                            });
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

    updateResource(resource, files, option, data) {
        return new Promise((resolve, reject) => {
            const framework = this.framework(resource.name.toLowerCase());
            let instance = (new framework), cwd = (resource.resource ? '' : (resource.folder || resource.name).toLowerCase());

            console.log(chalk.cyan('[INFO] '+resource.name+' update'));

            // update local config file
            let BaradaLocal = files.exists(cwd+'/barada.json') ? files.get(cwd+'/barada.json') : {}, lastMoment = BaradaLocal.date ? moment(BaradaLocal.date) : null;
            BaradaLocal.ref = data.activity.id;
            BaradaLocal.date = moment().format();
            let logs = [];

            instance.sync(data.path+'/'+resource.name.toLowerCase(), files.cwd(cwd), files, true, logs, lastMoment);


            if(logs.length > 0) {
                logs.forEach((state) => console.log(state));

                // TODO : check removed files

                instance.afterPull(resource, option, files).then((out) => {
                    console.log(out);
                    files.save(cwd+'/barada.json', JSON.stringify(BaradaLocal, null, 4));
                    resolve();
                }).catch((error) => {
                    console.log(error);
                    files.save(cwd+'/barada.json', JSON.stringify(BaradaLocal, null, 4));
                });
            }
            else {
                console.log(chalk.cyan(resource.name)+' : Already up to date.')
                files.save(cwd+'/barada.json', JSON.stringify(BaradaLocal, null, 4));
                resolve();
            }
        });
    }

    /**
     *
     * @param resources
     * @return {*}
     */
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

    /**
     *
     * @param commands
     * @param options
     * @param files
     * @return {Promise<void>}
     */
    async update(commands, options, files){
        if(!(await this.attenpt(commands, options, files))) return;
        const load = this.load('check configuration');

        if(files.exists('barada.json')){
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

    /**
     *
     * @param commands
     * @param options
     * @param files
     * @return {Promise<void>}
     */
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
     * @param commands
     * @param options
     * @param files
     */
    test(commands, options, files){
        let barada = files.get('barada.json');
        this.execUserScripts("reset", "after", barada, {
            options: {cwd: files.cwd('')},
            env: this.getDotEnv(files.cwd(''))
        }).then(out => {
            console.log('commande testé');
        })
        // files.copy(process.cwd()+'/Compressed', process.cwd()+'/destination');
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
