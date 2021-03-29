
const Command = require('../../../commands/Command');
const Console = require('../../../commands/Console');

class UpdateCommand extends Command{
    static SIGNATURE = 'update';
    static DESCRIPTION = 'Update the existing project resources from online existing projects';
    static GLOBAL_HELP_IGNORE = true;

    async handler() {
        return super.handler();
    }

}

module.exports = UpdateCommand;
