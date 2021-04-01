
const Command = require('../../../commands/Command');
// const Console = require('../../../commands/Console');

class PullCommand extends Command{
    static SIGNATURE = 'pull';
    static DESCRIPTION = 'Update the existing project from online existing projects';
    static GLOBAL_HELP_IGNORE = false;

    async handler() {
        console.log('Global pull checking');
        return super.handler();
    }
}

module.exports = PullCommand;
