
const Command = require('../../../commands/Command');
const Console = require('../../../commands/Console');

class ResetCommand extends Command{
    static SIGNATURE = 'reset';
    static DESCRIPTION = [
        'Remove all barada and database files and regenerate them as the first time',
        '{red.bold: avoid this command when you already deploy for production}'
    ];
    static GLOBAL_HELP_IGNORE = true;

    async handler() {
        return super.handler();
    }
}

module.exports = ResetCommand;
