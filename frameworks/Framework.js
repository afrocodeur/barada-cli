const inquirer = require('inquirer');
const clear = require('clear');
const CLI = require('clui');

// const Configstore = require('configstore');
// const Octokit = require('@octokit/rest');

const { exec } = require('child_process');
const Spinner = CLI.Spinner;
const Progress = CLI.Progress;

var chalk = require('chalk');


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
     * @param values
     * @param options
     */
    install(values, options){}

    /**
     * Push and update your online project with the local project
     * @param values
     * @param options
     */
    push(values, options){}

    /**
     * Update your local project with the online project modification
     * @param values
     * @param options
     */
    pull(values, options){}

    /**
     * display the help of the specific command
     */
    help(){}


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
                    reject ? reject(stderr) : null
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
     */
    sync(source, to, files, all = false){
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

    noCommand(command) {
        console.log(chalk.red("[ERROR]")+" Unable to find command: "+command+"\n");
        console.log("\tYou may need to be in an Barada project directory.");
    }

    /**
     *
     * @param directpath
     * @param stat
     * @param infos
     * @param files
     * @return {boolean}
     */
    copyFileFilter(directpath, stat, infos, files) {
        if(stat.isDirectory()) return true;
        if(!files.exists(infos.to+infos.relative, false)) {
            if(infos.logs){
                infos.logs.push(chalk.green('add '+infos.relative));
            }
            return true;
        }
        let regex = this.filters;

        for(let reg of regex){
            if(reg.test(infos.relative))
                return false;
        }

        let code = files.read(directpath, false), old = files.read(infos.to+infos.relative, false);
        if(code === old) return false;

        if(infos.logs){
            infos.logs.push(chalk.cyan('update '+infos.relative));
        }

        return true;
    }

    /**
     *
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
}
