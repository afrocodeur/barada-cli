const inquirer = require('inquirer');
const clear = require('clear');
const CLI = require('clui');

// const Configstore = require('configstore');
// const Octokit = require('@octokit/rest');

const { exec, spawn } = require('child_process');
const Spinner = CLI.Spinner;
const Progress = CLI.Progress;

const FileHelper = require('../lib/files');

var chalk = require('chalk');

const Login = require('./Global/prompt/Login');
const SelectProject = require('./SelectProject');
const {ConfigWriter} = require('./ConfigStart');
const {api} = require('../lib/api');
const {browser} = require('../lib/url');
const {global} = require('../lib/helper');

const moment = require('moment');

module.exports = class Framework {

    constructor(){
        this.args = null;
        this.filters = [];
    }

    /**
     * check if the current work directory is for this framework
     * @param files
     * @returns {boolean}
     */
    static inspector(files){
        return false;
    }

    async attenpt(commands, options, files){
        if(!api.logged()){
            await this.login(commands, options, files);
        }

        return api.logged();
    }

    /**
     * init a project for this framework
     */
    init(){
        //TODO init something for the project
    }

    /**
     * Create new project from online existing project or
     * push local project to barada
     * @param values
     * @param options
     */
    create(values, options){}

    /**
     * do something after the first installation
     * @returns {Promise<any>}
     */
    afterCreate(){ return new Promise((resolve, reject) => {});}

    /**
     * do something after the pull request
     * @returns {Promise<any>}
     */
    afterPull(){ return new Promise((resolve, reject) => {});}

    /**
     * install and deploy your project
     * @param commands
     * @param options
     */
    install(commands, options){}

    /**
     * Push and update your online project with the local project
     * @param commands
     * @param options
     */
    push(commands, options){}

    /**
     * Update your local project with the online project modification
     * @param commands
     * @param options
     */
    pull(commands, options){}

    /**
     * update the current project with online configuration
     * @param commands
     * @param options
     */
    update(commands, options){}

    /**
     * display the help of the specific command
     */
    help(){
        return Object.assign({
            init: {
                desc: "Reinitialize an existing repository"
            },
            tag: {
                desc: "List, delete or verify a tag object",
                docs: {

                },
                beta: true
            }
        }, this.helper());
    }

    helper(){
        return {};
    }


    /**
     * get a framework class by his name
     * @param name
     * @returns {*}
     */
    framework(name) {
        const frameworks = require('./frameworks');

        return frameworks[name];
    }

    /**
     * execute a command
     * @returns {Promise<any>}
     */
    exec(){
        return new Promise((resolve, reject) => {
            exec.apply(this, [...Array.from(arguments), (error, stdout, stderr) => {
                if(error){
                    console.log('');
                    console.log(chalk.red('[Error]')+' ', stderr);
                    // console.log(chalk.red('[More details]')+' ', error);
                    console.log(chalk.red(stdout));
                    reject ? reject(error) : null
                }else{
                    resolve ? resolve(stdout) : null;
                }
            }])
        });
    }

    /**
     * synchronise online data with local data
     * @param source
     * @param to
     * @param files
     * @param all
     * @param logs
     * @param lastMoment
     */
    sync(source, to, files, all = false, logs, lastMoment){
    }

    /**
     * run the custom server of the framework
     * @returns {string}
     */
    serve(){ return ''; }

    /**
     * use prompt to get some information
     * @param questions
     * @param defaults
     * @returns {*}
     */
    async prompt(questions, defaults = {}){
        var answers = await inquirer.prompt(questions);

        for(var key in answers)
            defaults[key] = answers[key];

        return defaults;
    }

    async promptConfirm(message){
        var answers = await inquirer.prompt([{
            message : message,
            name : 'confirm',
            type : 'list',
            choices : ['yes', 'no']
        }]);

        return answers.confirm;
    }

    /**
     * get a cli ui manager
     * @param type
     * @returns {{Line, Progress, LineBuffer, Table, Spinner, Sparkline, Gauge, Clear}}
     */
    cli(type){ return type ? CLI[type] : CLI; }

    /**
     * Start loading
     * @param text
     * @returns {helpers.Spinner|helpers.Spinner}
     */
    load(text){
        const spiner = new Spinner(text);
        spiner.start();
        return spiner;
    }

    /**
     *
     * @param percent
     * @param bars
     * @returns {helpers.Progress|helpers.Progress}
     */
    progress(text = '', percent = 0, bars = 50){
        let progress = new Progress(bars);
        progress.to = (percent, clean = true) => {
            // clean ? true : null
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(text +' '+progress.update((bars*percent)/100, bars));
            if(percent === 100) console.log('');
        };

        progress.to(percent, false);
        return progress;
    }

    noCommand(command, may) {
        console.log(chalk.red("[ERROR]")+" Unable to find command: "+command+"\n");
        may !== false ? console.log("\tYou may need to be in an Barada project directory.") : null;
    }

    /**
     *
     * @param directpath
     * @param stat
     * @param infos
     * @param files
     * @return {boolean}
     */
    copyFileFilter(directpath, stat, infos, files, lastMoment) {
        if(stat.isDirectory()) return true;
        if(!files.exists(infos.to+infos.relative, false)) {
            if(infos.logs){
                infos.logs.push(chalk.green('add '+infos.relative));
            }
            return true;
        }
        let regex = this.filters;

        for(let reg of regex){
            if(typeof reg === 'function'){
                if(reg.apply(this, [infos])){
                    break;
                }
                continue;
            }

            if(typeof reg === 'string'){

            }
            else if(reg.test(infos.relative)) {
                // if(lastMoment && lastMoment.isSameOrAfter(moment(infos.mtime))){
                //     break;
                // }
                return false;
            }
        }

        let code = files.read(directpath, false), old = files.read(infos.to+infos.relative, false);
        if(code === old) return false;

        if(infos.logs){
            infos.logs.push(chalk.cyan('update '+infos.relative));
        }

        return true;
    }

    /**
     * @deprecated
     * @return {{}}
     */
    envAssoc() {
        return {}
    }

    /**
     *
     * @param params
     */
    env(params) {
        let assoc_env = this.envAssoc()
        let env = {};
        for(var key in params)
            env[(assoc_env[key] || key)] = params[key];
        return env;
    }

    /**
     * lunch the local server
     * @param options
     */
    spawn(command, args, options) {
        return spawn(command, args, options);
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
            }).catch(error => {
                console.log(chalk.red('[Error]')+' : Download error, please try later.');
            });
        });
    }

    /**
     *
     * @param files
     * @param file
     * @param barada
     */
    saveConfig(files, file, barada) {
        files.save(file, JSON.stringify(Object.assign( barada, {type: "resource", date: moment().format()}), null, 4));
    }

    resource(resources){
        let r = resources[0];
        if(!r){
            console.log(chalk.red("[Error] : ")+"Resource is not found")
        }
        return r;
    }

    /**
     * the user projects list
     * @param commands
     * @param options
     * @param files
     */
    projects(commands, options, files){
        return new Promise((resolve, reject) => {
            if(api.logged()){
                const load =  this.load('Load project list');
                api.projects().then(projects => {
                    load.stop();
                    resolve(projects);
                }).catch(error => {
                        load.stop();
                        console.log(chalk.red('[error]')+' You are not logged.')
                        reject ? reject(error) : null ;
                    });
            }
            else{
                console.log(chalk.red('[error]')+' You are not logged.')
            }
        });
    }
    selectProject(commands, options, files, custom){
        const load = this.load('');

        return new Promise((resolve, reject) => {
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
                        data = await this.prompt(SelectProject(projects, custom));
                    }
                    else{
                        data.folder = options.folder || data.project.name.toLowerCase()
                        data.resources = data.project.resources.filter(item => item.type === 'framework');
                    }

                    data.folder = (custom.init) ? '' : data.folder;

                    if(data.project && (custom.create || ((!custom || !custom.framework) && data.folder) || (custom.framework && !data.folder))){
                        data.folder = (data.folder || '').trim();
                        const configs = ConfigWriter(data);
                        resolve({data, configs});
                    }
                    else {
                        console.log(chalk.red('[ERROR]')+' please make sure you done well your project configuration.');
                    }

                }
                else{
                    console.log(chalk.cyan('[INFO] please create and configure project before'))
                }
            }).catch((error) => { load.stop(); console.log(error) });
        })
    }

    logged(callback){
        if(api.logged()){
            callback.apply(this, []);
        }
        else{
            console.log(chalk.red('[error]')+' You are not logged.')
        }
    }

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
            }).catch(function (error) {
                load.stop();
                console.log(chalk.red('[error]')+' These credentials do not match our records.');
            });
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
     *
     * @param on
     * @param when
     * @param config
     * @param params
     * @return {Promise<any>}
     */
    execUserScripts(on, when, config, params) {
        return new Promise((resolve, reject) => {
            try{
                if(config.scripts && config.scripts[on] && config.scripts[on][when]){
                    let scripts = config.scripts[on][when];
                    if(typeof scripts === 'string') {
                        scripts = [scripts];
                    }
                    if(scripts.length){
                        let index = -1;
                        let execute = () => {
                            index++;
                            let cmd = scripts[index];
                            if(cmd){
                                if(params.env){
                                    for (let key in params.env){
                                        cmd = cmd.replace(new RegExp('{'+key+'}'), params.env[key]);
                                    }
                                }
                                console.log(chalk.green(cmd));
                                this.exec(cmd, params.options).then(out => {
                                    console.log(out);
                                    execute();
                                }).catch(error => {
                                    // console.log(error);
                                    resolve();
                                });
                            }
                            else resolve();
                        };
                        execute();
                    }
                    else resolve();
                }
                else{
                    resolve();
                }
            }catch (e) { reject(e); }
        });
    }

    getDotEnv(cwd) {
        let env = {};
        if(FileHelper.exists(cwd+'/.env', false)){
            let files = FileHelper.get(cwd+'/.env', false);
            files.split('\n').map(item => item.trim().split('=')).forEach(item => {
                if(item.length === 2) env[item[0].trim()] = item[1].trim();
            });
        }
        return env;
    }
}
