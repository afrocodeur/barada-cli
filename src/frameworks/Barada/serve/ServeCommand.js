
const Command = require('../../../commands/Command');
const Console = require('../../../commands/Console');

class ServeCommand extends Command{
    static SIGNATURE = 'serve';
    static DESCRIPTION = 'Lunch each server of each project';
    static GLOBAL_HELP_IGNORE = true;

    async handler() {
        return super.handler();
    }
}

module.exports = ServeCommand;
