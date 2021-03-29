const Command = require('../../../../commands/Command');
const File = require('../../../../utils/File');
const DefaultService = require('../../../../services/DefaultService');
const LaravelFramework = require('../../LaravelFramework');

class PullCommand extends Command{
    static SIGNATURE = 'pull';
    static DESCRIPTION = 'Update the current project';
    Framework = LaravelFramework;

    async handler() {
        await this.checkBarada(async () => {
            let framework = this.framework();

            if(framework) {
                await framework.pull();
            }
        }, 'pull');
        return super.handler();
    }
}

module.exports = PullCommand;
