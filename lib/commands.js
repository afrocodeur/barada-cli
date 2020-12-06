const chalk = require('chalk');

module.exports = {
    'docs' : {
        desc: 'Open the barada documentation website',
        check: false
    },
    'signup' : {
        desc: 'Create an Miridoo account to use Barada',
        check: false
    },
    'login' : {
        desc: 'Log in to barada',
        check: false
    },
    'logout' : {
        desc: 'Log out of barada ',
        check: false
    },
    // 'projects' : 'Display user projects',
    // 'create ' : 'Create a new project',
    'start' : {
        desc: 'Start new project from online existing projects',
        check: false,
        docs: {
            '--project=[value]': 'The '+chalk.cyan('value')+' can be the project Id or Name',
            '--folder=[value]': 'The '+chalk.cyan('value')+' is the folder name',
            // '--full': 'Use the config from online'
        }
    },
    // 'init' : 'Initialize existing project with online existing projects',
    // 'test' : 'temp function to test something',
    // 'project' : '',
    // 'fetch' : '',
    'pull' : {
        desc: 'Update the existing project from online existing projects',
        check: true
    },
    'reset' : {
        desc: ['Remove all barada and database files and regenerate them as the first time.',
                chalk.red('avoid this command when you already deploy for production')],
        docs: {
            '--tag': 'Use all tags to re build the project from start'
        },
        check: true
    },
    'update' : {
        desc: 'Update the existing project resources from online existing projects',
        check: true
    },
    'serve' : {
        desc: 'Lunch each server of each project',
        check: true
    },
    // 'test' : {
    //     desc: "Test a custom command"
    // },
    // 'push' : '',
    // 'install' : ''
};
