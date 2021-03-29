const Command = require('../../../commands/Command');
const Console = require('../../../commands/Console');

const DefaultService = require('../../../services/DefaultService');

const Open = require('open');

class SignupCommand extends Command{
    static SIGNATURE = 'signup {--web=true:boolean}';
    static DESCRIPTION = 'Create an Miridoo account to use Barada';

    async handler() {
        Open(DefaultService.miridoo('signup/barada'));
        Console.write('{green.bold: [OK]} Launched signup form in your browser!');
        return this;
    }
}

module.exports = SignupCommand;
