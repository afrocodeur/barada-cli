var chalk = require('chalk');

const global = require('./commands');


function format(str){
    return ' '+str;
}

function dot(key, length) {
    let count = length - key.length, dots = [];
    for(let i = 0; i < count; i++) dots.push('-')
    return ' '+dots.join('');
}

function helper(command) {
    let usage = '\t$ '+chalk.cyan('barada')+' '+chalk.green((command ? command : '<command>'))+' '+(command ? '' : chalk.white('[<args>] [--help] [option]*'));
    const docs = (command && global[command]) ? global[command].docs : null;

    command = (docs || global);

    usage += docs ? chalk.cyan(Object.keys(command).join(' ')) : '';

    console.log('\n');
    console.log(format('Usage : \n'));
    console.log(format(usage))
    console.log(format('\nProject Commands:: : \n'));


    var length = 0;
    Object.keys(command).forEach(item => {
        const text = item.desc || item;
        length = (text.length > length) ? text.length : length;
    });

    length += 30;

    for (let key in command) {
        console.log('\t'+format(chalk.cyan(key)+dot(key, length))+' '+(command[key].desc || command[key]));
    }

    console.log(format('\nCurrent Directory Commands:: : \n'));
    console.log(chalk.grey('\tYou are not in a supported project directory.'))

}

module.exports = {
    helper,
    dot,
    format,
    global
};
