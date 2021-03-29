const Command = require('../../../commands/Command');
const RootPackage = require('../../../utils/RootPackage');

class BaradaCommand extends Command{
    static SIGNATURE = ' {--version=0?}';


    async handler() {
        if (this.option('version')) {
            console.log(RootPackage.VERSION);
        }
    }
}

module.exports = BaradaCommand;
