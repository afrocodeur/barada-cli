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
        /*
         * GET ARGS
         */
        const args = module.exports.args();

        let command = args.commands[0];

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
                Framework[command].apply(Framework, [args.commands.slice(1), args.options, files]);
            }
        }
        else {
            inspector.noframework();
        }

        return Framework;
    },
    help : (framework) => {
        console.log( chalk.white( figlet.textSync('Barada', { horizontalLayout: 'default' }) ) );
        console.log(' VERSION CLI 1.0.0');
        helper(framework);
    },
    args : () => {
        const args = arg(
            {
                '--git': Boolean,
                '--yes': Boolean,
                '--install': Boolean,
                '-g': '--git',
                '-y': '--yes',
                '-i': '--install',
            },
            {
                argv: process.argv.slice(2),
            }
        );

        return {
            options : {skip : args['--yes'] || false},
            commands : args._
        }
    },

    noframework : () => {

    }

};

module.exports = inspector;
