const Figlet = require('figlet');
const Chalk = require('chalk');

const RootPackage = require('../utils/RootPackage');
const ProcessArgBuilder = require('../utils/ProcessArgBuilder');
const Console = require('../commands/Console');

class HelpBuilder {
    static SPACE_DASH = 50;
    static DASH_CHARACTER = '-';

    static barada(kermel) {
        console.log( Chalk.white( Figlet.textSync('Barada', { horizontalLayout: 'default' }) ) );
        console.log('VERSION CLI '.concat(RootPackage.VERSION));
        console.log('');
        Console.write( 'Usage :');
        Console.write( ' \t$ {cyan: barada} {green: <command>} {grey: [<args>]*} {grey: [option]*}');
        console.log('');
        Console.write( 'Global Commands :');
        HelpBuilder.commands(kermel);
        console.log('');
    }

    static detector(detector) {
        Console.write('Current Directory Commands:');
        if(detector) {
            let commands = detector.commands();

            if(commands.length) {
                HelpBuilder.commands(detector.commands());
            }
        }
        else {
            Console.write('{yellow.bold: You are not in supported project.}');
        }
        console.log('');
    }

    static commands(commands){
        commands = commands.filter(item => item.GLOBAL_HELP_IGNORE === false);

        for(let command of commands) {
            let builder = new ProcessArgBuilder(command.SIGNATURE);
            if(builder.launcher) {
                if(typeof command.DESCRIPTION === 'string') {
                    Console.write('\t{blue: '+builder.launcher+'}' + HelpBuilder.dash(builder.launcher) + command.DESCRIPTION);
                }
                else if(command.DESCRIPTION.constructor === Array) {
                    command.DESCRIPTION.forEach((description, index) => {
                        if(index === 0) {
                            Console.write('\t{blue: '+builder.launcher+'}' + HelpBuilder.dash(builder.launcher) + description);
                        }
                        else {
                            Console.write('\t' + HelpBuilder.dash('', ' ') + description);
                        }
                    });
                }
            }
        }
    }

    static dash(used, character) {
        character = (character || HelpBuilder.DASH_CHARACTER);
        let out = ' ';
        for(let i = used.length + 1; i < HelpBuilder.SPACE_DASH; i++) {
            out += character;
        }
        return out +' ';
    }


}

module.exports = HelpBuilder;
