const chalk = require('chalk');

const config = (answers) => (answers.config === 'yes');
module.exports = [
    {
        message : chalk.yellow('Database : ')+'Do you to configure the '+chalk.yellow('.env')+' file ',
        name : 'config',
        type : 'list',
        choices : ['yes', 'no']
    },
    {
        name : 'DB_HOST',
        type : 'input',
        default : '127.0.0.1',
        when : config
    },
    {
        name : 'DB_PORT',
        type : 'input',
        default : '3306',
        when : config
    },
    {
        name : 'DB_DATABASE',
        type : 'input',
        default : 'laravel',
        when : config
    },
    {
        name : 'DB_USERNAME',
        type : 'input',
        default: 'root',
        when : config
    },
    {
        name : 'DB_PASSWORD',
        type : 'input',
        when : config
    }
];
