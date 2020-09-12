var chalk = require('chalk');

const global = require('./commands');
const resources = {pull: true, reset: true};

function format(str){
    return ' '+str;
}

function dot(key, length, dot) {
    let count = length - key.length, dots = [];
    for(let i = 0; i < count; i++) dots.push( dot || '-')
    return ' '+dots.join('');
}

function helper(command, framework) {
    let usage = '\t$ '+chalk.cyan('barada')+' '+chalk.green((command ? command : '<command>'))+' '+(command ? '' : chalk.white('[<args>] [--help] [option]*'));
    let docs = (command && global[command]) ? global[command].docs : null;
    const commandName = command;
    if(framework[command]){
        docs = framework[command].docs;
    }

    console.log(command)
    command = (docs || global);

    usage += docs ? chalk.cyan(Object.keys(command).join(' ')) : '';

    console.log('\n');
    console.log(format('Usage : \n'));
    console.log(format(usage))
    console.log(format(docs ? '\n'+chalk.red(commandName)+' Options\n' : '\nProject Commands:: : \n'));

    displayCommand(command);

    console.log(format('\nCurrent Directory Commands : \n'));
    if(framework && Object.keys(framework).length){
        displayCommand(framework);
    }
    else console.log(chalk.grey('\tYou are not in a supported project directory.'));
}

function displayCommand(command) {
    var length = 0;
    Object.keys(command).forEach(item => {
        const text = item.desc || item;
        length = (text.length > length) ? text.length : length;
    });

    length += 30;

    for (let key in command) {
        var desc = command[key].desc || command[key], debug = command[key].beta ? chalk.yellow(' { Beta }') : '';
        if(typeof desc === 'string'){
            console.log('\t'+format(chalk.cyan(key)+dot(key, length))+' '+(desc) + debug);
        }
        else{
            desc.forEach((str, index) => {
                if(index === 0) console.log('\t'+format(chalk.cyan(key)+dot(key, length))+' '+(str) + debug);
                else{
                    console.log('\t'+dot(key, key.length*2, ' ')+dot(key, length, ' ')+' '+(str) + debug);
                }
            });
        }
    }
}

module.exports = {
    helper,
    dot,
    format,
    displayCommand,
    global,
    resources
};
