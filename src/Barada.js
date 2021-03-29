
const Console = require('./commands/Console');

const RootPackage = require('./utils/RootPackage');
const HelpBuilder = require('./utils/HelpBuilder');
const ProcessArgBuilder = require('./utils/ProcessArgBuilder');

const BaradaCommands = require('./frameworks/Barada');
const LaravelCommands = require('./frameworks/Laravel/commands');
const Detectors = require('./frameworks/detectors');

class Barada {

    KermelGlobal = [
        ...BaradaCommands
    ];
    Kermel = [
        ...LaravelCommands,
    ];

    async start() {
        process.argv.splice(0, 2);

        let builder = new ProcessArgBuilder(process.argv);
        let detector = this.detector();
        let command = null;

        if(detector) {
            for(let item of this.Kermel) {
                command = builder.match(item);
                if(command) {
                    if(detector.mine(command)) {
                        break;
                    }
                    else {
                        command = null;
                    }
                }
            }
        }

        if(!command) {
            for(let item of this.KermelGlobal) {
                command = builder.match(item);
                if(command) {
                    break;
                }
            }
        }

        if(command) {
            command.setDetector(detector);
            command.setDetectors(Detectors);

            if(builder.option('help') || process.argv.length === 0) {
                HelpBuilder.barada(this.KermelGlobal);
                HelpBuilder.detector(detector);
            }
            else {
                let handle = await command.handler();
            }
        }
        else {
            if(builder.launcher) {
                Console.error(RootPackage.NAME + " : "+builder.launcher+" is not a "+ RootPackage.NAME +" command. See '"+ RootPackage.NAME +" --help'.")
            }
            else if(builder.option('help')) {
                HelpBuilder.barada(this.KermelGlobal);
                HelpBuilder.detector(detector);
            }
        }

    }

    detector() {
        for(let detector of Detectors) {
            detector = new detector();
            if(detector.check() === true) {
                return detector;
            }
        }
        return null;
    }

}


module.exports = Barada;
