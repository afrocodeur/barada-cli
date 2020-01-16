var chalk = require('chalk');

const global = {
    'docs' : 'Open the barada documentation website',
    'signup' : 'Create an Miridoo account to use Barada',
    'login' : 'Log in to barada',
    'logout' : 'Log out of barada ',
    // 'projects' : 'Display user projects',
    // 'create ' : 'Create a new project',
    'start' : 'Start new project from online existing projects',
    // 'init' : 'Initialize existing project with online existing projects',
    // 'test' : 'temp function to test something',
    // 'project' : '',
    // 'fetch' : '',
    'pull' : 'Update the existing project from online existing projects',
    // 'push' : '',
    // 'install' : '',
    // 'docs' : '',
};

function format(str){
    return ' '+str;
}

function dot(key, length) {
    let count = length - key.length, dots = [];
    for(let i = 0; i < count; i++) dots.push('-')
    return ' '+dots.join('');
}

function helper(help) {
    console.log('\n');
    console.log(format('Usage : \n'));
    console.log(format('\t$ '+chalk.cyan('barada')+' '+chalk.green('<command>')+' '+chalk.white('[<args>] [--help] [option]*')))
    console.log(format('\nProject Commands:: : \n'));

    var length = 0;
    Object.keys(global).forEach(item => {
        length = (item.length > length) ? item.length : length;
    });
    length += 30;

    for (let key in global) {
        console.log('\t'+format(chalk.cyan(key)+dot(key, length))+' '+global[key]);
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
