const chalk = require('chalk');

const config = (answers) => (answers.config === 'yes');
module.exports = function(env){
    return [
        {
            message : chalk.yellow('Database : ')+'Do you to configure the '+chalk.yellow('.env')+' file\nselect '+chalk.yellow('no')+' to use online configuration',
            name : 'config',
            type : 'list',
            choices : ['yes', 'no']
        },
        {
            name : 'DB_HOST',
            type : 'input',
            default : (env.DB_HOST || '127.0.0.1'),
            when : config
        },
        {
            name : 'DB_PORT',
            type : 'input',
            default : (env.DB_PORT || '3306'),
            when : config
        },
        {
            name : 'DB_DATABASE',
            type : 'input',
            default : (env.DB_DATABASE || 'laravel'),
            when : config
        },
        {
            name : 'DB_USERNAME',
            type : 'input',
            default: (env.DB_USERNAME || 'root'),
            when : config
        },
        {
            name : 'DB_PASSWORD',
            type : 'input',
            default: (env.DB_PASSWORD || ''),
            when : config
        }
    ]
};
