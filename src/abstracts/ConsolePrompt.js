const inquirer = require('inquirer');
const clear = require('clear');
const CLI = require('clui');

const Spinner = CLI.Spinner;
const Progress = CLI.Progress;

class ConsolePrompt {
    answers = {};

    questions() {
        return {};
    }

    check() { return true; }

    all() { return JSON.clone(this.answers); }

    get(name, value) {
        return this.answers[name] || value;
    }

    async prompt() {
        var answers = await inquirer.prompt(this.questions());

        for(let key in answers)
            this.answers[key] = answers[key];

        return this;
    }
}


module.exports = ConsolePrompt;
