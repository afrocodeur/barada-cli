var arg = require('arg');
var files = require('./files');
var {helper, global, resources} = require('./helper');
var chalk = require('chalk');
var figlet = require('figlet');

var frameworks = require('../frameworks/frameworks');


var inspector = {

    check : () => {
        const args = inspector.args();
        let command = args.commands[0];
        let Framework = null;
        for (let key in frameworks) {
            if(frameworks[key].inspector(files, command)) {
                Framework =  new frameworks[key];
                break;
            }
        }

        // Framework ? Framework.init() : null;
        if(!process.argv.slice(2).length){
            inspector.help(null, (Framework ? Framework.help() : null));
            return;
        }
        if(args.options.help){
            inspector.help(command, (Framework ? Framework.help() : null));
            return;
        }
        if(args.options.version){
            let version = '1.0.0';
            try{
                let package = require(__dirname+'/../package.json');
                version = package.version;
            }catch(e){  }

            console.log(version);

            return;
        }

        if(Framework){
            if(command && typeof Framework[command] === 'function'){
                let type = '';
                const details = global[command];
                if(details && details.check){
                    if(!files.exists('./barada.json')){
                        inspector.noframework();
                        return;
                    }
                    else {
                        const config = files.get('barada.json');
                        type = config.type;
                        if(!(config.type === 'resource' && resources[command]) && config.type !== 'project'){
                            inspector.noframework();
                            return;
                        }
                    }
                }
                Framework[command].apply(Framework, [args.commands.slice(1), args.options, files, (type === 'resource')]);
            }
        }
        else {
            inspector.noframework();
        }

        return Framework;
    },
    help : (command, framework) => {
        console.log( chalk.white( figlet.textSync('Barada', { horizontalLayout: 'default' }) ) );
        console.log(' VERSION CLI 1.0.0');
        helper(command, framework);
    },
    args : () => {
        const args = arg(
            {
                '--yes': Boolean,
                '--install': Boolean,
                '--help': Boolean,
                '--version': Boolean,
                '--project': String,
                '--folder': String,
                '--clean': Boolean
            },
            {
                argv: process.argv.slice(2),
            }
        );

        return {
            options : {
                skip : (args['--yes'] || false),
                help: (args['--help'] || false),
                project: (args['--project'] || null),
                version: (args['--version'] || null),
                folder: (args['--folder'] || null),
                clean: (args['--clean'] || null)
            },
            commands : args._
        }
    },

    noframework : () => {
        console.log(chalk.cyan('[INFO]')+' You are not in a supported project directory.');
    }

};

module.exports = inspector;
