var arg = require('arg');
var files = require('./files');
var {helper, global} = require('./helper');
var chalk = require('chalk');
var figlet = require('figlet');

var frameworks = require('../frameworks/frameworks');


var inspector = {

    check : () => {
        if(!process.argv.slice(2).length){
            inspector.help();
            return;
        }
        const args = inspector.args();
        let command = args.commands[0];
        if(args.options.help){
            inspector.help(command);
            return;
        }


        let Framework = null;
        for (let key in frameworks) {
            if(frameworks[key].inspector(files, command)) {
                Framework =  new frameworks[key];
                break;
            }
        }

        Framework ? Framework.init() : null;

        if(Framework){
            if(command && typeof Framework[command] === 'function'){
                const details = global[command];
                if(details.check){
                    if(!files.exists('./barada.json')){
                        inspector.noframework();
                        return;
                    }
                    else {
                        const config = files.get('barada.json');
                        if(config.type !== 'project' || !config.resources){
                            inspector.noframework();
                            return;
                        }
                    }
                }
                Framework[command].apply(Framework, [args.commands.slice(1), args.options, files]);
            }
        }
        else {
            inspector.noframework();
        }

        return Framework;
    },
    help : (command) => {
        console.log( chalk.white( figlet.textSync('Barada', { horizontalLayout: 'default' }) ) );
        console.log(' VERSION CLI 1.0.0');
        helper(command);
    },
    args : () => {
        const args = arg(
            {
                '--yes': Boolean,
                '--install': Boolean,
                '--help': Boolean,
                '--project': String,
                '--folder': String
            },
            {
                argv: process.argv.slice(2),
            }
        );

        return {
            options : {skip : (args['--yes'] || false), help: (args['--help'] || false), project: (args['--project'] || null), folder: (args['--folder'] || null)},
            commands : args._
        }
    },

    noframework : () => {
        console.log(chalk.cyan('[INFO]')+' You are not in a supported project directory.');
    }

};

module.exports = inspector;
