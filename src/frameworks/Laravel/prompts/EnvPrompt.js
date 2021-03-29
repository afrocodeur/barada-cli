const ConsolePrompt = require('../../../abstracts/ConsolePrompt')

class EnvPrompt extends ConsolePrompt{

    questions() {
        return [
            {
                name : 'config',
                message : 'Do you want to configure your .env file (yes/no) ?',
                type : 'text',
                default: 'yes'
            },
            {
                name : 'online',
                type : 'input',
                message : 'Use online env configuration ?',
                default : 'no',
                when : (answers) => (answers.config === 'yes'),
            }
        ];
    }

    check() {
        return this.get('config') === 'yes';
    }
    online() {
        return this.get('online') === 'yes';
    }
}

module.exports = EnvPrompt;
