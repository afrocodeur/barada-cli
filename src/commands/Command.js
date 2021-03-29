const CLI = require('clui');
const ConfirmPrompt = require('./ConfirmPrompt');
const Console = require('./Console');
const Framework = require('../abstracts/Framework');
const CommandHelper = require('../utils/CommandHelper');
const File = require('../utils/File');

const { exec, spawn } = require('child_process');

const Spinner = CLI.Spinner;
const Progress = CLI.Progress;

class Command {
    static SIGNATURE = '';
    static GLOBAL_HELP_IGNORE = false;
    static DESCRIPTION = '';

    Framework = Framework;

    options = {};
    args = {};
    currentDetector = null;
    detectors = [];
    location = process.cwd();

    async checkBarada(callback, command = '') {
        if(File.exists('barada.json')) {
            callback ? await callback() : null;
        }
        else {
            Console.warning("barada.json not found");
            if(command) {
                Console.error("[ERROR] Unable to find commands: " + command);
            }
        }
    }

    option(name, defaultValue = undefined) {
        return this.options[name] || defaultValue;
    }

    argument(name, defaultValue = undefined) {
        return this.args[name] || defaultValue;
    }

    load(text) {
        let spinner = new Spinner(text);
        spinner.start();
        return spinner;
    }

    framework() {
        let framework = new this.Framework();
        framework.command =  this;
        return framework;
    }

    progress(text = '', percent = 0, bars = 50){
        let progress = new Progress(bars);
        progress.nativeUpdate = progress.update;

        progress.stop = (percent) => console.log('');
        progress.update = (percent) => {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(text +' '+progress.nativeUpdate(percent));
            if(percent === 1) console.log('');
        };

        progress.update(percent);
        return progress;
    }

    async commandExist(command) {
        command = CommandHelper.ALIAS[command] || command;

        return new Promise(((resolve, reject) => {
            const child = exec(command, {}, (error, stdout, stderr) => {
                if(error) {
                    reject ? reject(false) : null;
                    Console.error(stderr);
                }
                else {
                    resolve ? resolve(true) : null;
                }
            });
        }));
    }

    async exec(command, args, params = {}) {
        let exists = await this.commandExist(command);
        if(exists) {
            command += ' ' + args;
            let load = this.load(command);
            return new Promise(((resolve, reject) => {
                const child = exec(command, params , (error, stdout, stderr) => {
                    load.stop();
                    if(error) {
                        reject ? reject(error, stderr) : null;
                        console.log(stderr);
                    }
                    else {
                        resolve ? resolve(stdout) : null;
                        Console.success(stdout)
                    }
                });
            }));
        }
        return null;
    }

    setDetector(detector) {
        this.currentDetector = detector;
        return this;
    }

    setDetectors(detectors) {
        this.detectors = detectors;
        return this;
    }

    detector(name) {
        if(name) {
            for(let item of this.detectors) {
                if(item.FRAMEWORK_NAME.toLowerCase() === name.toLowerCase()) {
                    return new item();
                }
            }
            return null;
        }
        return this.currentDetector;
    }

    async confirm(message) {
        return await (new ConfirmPrompt(message)).prompt();
    }

    async handler() {
        return null;
    }
}


module.exports = Command;
