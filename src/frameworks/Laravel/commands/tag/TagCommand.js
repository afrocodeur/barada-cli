const Command = require('../../../../commands/Command');

class TagCommand extends Command{
    static SIGNATURE = 'tag';
    static GLOBAL_HELP_IGNORE = true;
    static DESCRIPTION = 'List, delete or verify a tag object';

    async handler() {
        return super.handler();
    }
}

module.exports = TagCommand;
