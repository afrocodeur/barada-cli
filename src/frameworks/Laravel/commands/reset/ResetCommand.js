const Command = require('../../../../commands/Command');
const File = require('../../../../utils/File');
const DefaultService = require('../../../../services/DefaultService');
const LaravelFramework = require('../../LaravelFramework');

class ResetCommand extends Command{
    static SIGNATURE = 'reset';
    static DESCRIPTION = 'Reset the project files, migrations and other based on your projects tags';
    Framework = LaravelFramework;

    async handler() {
        await this.checkBarada(async () => {
            let framework = this.framework();

            if(framework) {
                await framework.reset();
            }
        }, 'reset');
        return await super.handler();
    }
}

module.exports = ResetCommand;
