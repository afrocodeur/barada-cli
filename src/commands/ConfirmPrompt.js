const CommandPrompt = require('../abstracts/ConsolePrompt');

class ConfirmPrompt extends CommandPrompt{
    message = '';

    constructor(message) {
        super();
        this.message = message;
    }

    check() {
        return this.get('confirm') === 'yes';
    }
    questions() {
        return [
            {
                message : this.message,
                name : 'confirm',
                type : 'list',
                choices : ['yes', 'no']
            }
        ]
    }
}

module.exports = ConfirmPrompt;
