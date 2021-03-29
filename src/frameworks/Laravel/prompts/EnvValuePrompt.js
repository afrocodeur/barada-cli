const ConsolePrompt = require('../../../abstracts/ConsolePrompt')

class EnvValuePrompt extends ConsolePrompt{
    values = [];
    env = {};

    constructor(values, env = {}) {
        super();
        this.values = values;
        this.env = env;
    }
    set(values) {
        this.values = values;
        return this;
    }

    merge() {
        for(let item of this.values) {
            this.env[item] = this.get(item) || this.env[item];
        }
        return this;
    }

    questions() {
        let questions = [];

        for(let item of this.values) {
            questions.push({
                name: item,
                message: item,
                default: this.env[item] || '',
            });
        }

        return questions;
    }

}

module.exports = EnvValuePrompt;
