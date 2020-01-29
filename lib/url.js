var open = require('open');
var chalk = require('chalk');

var BASE_URL = 'https://barada.miridoo.com/api';
const BARADA_URL = 'https://barada.miridoo.com/';
const MIRIDOO_URL = 'http://accounts.miridoo.com/';

// const BASE_URL = 'http://barada.local/api';
// const BARADA_URL = 'http://barada.local/';
// const MIRIDOO_URL = 'http://accounts.local/';

var url = {
    login :'login',
    download :'download',
    build :'build',
    pull :'pull',
    projects :'projects',
    logout : 'logout'
};


var browser = {
    docs : function(){
        open(BARADA_URL+'docs');
        console.log(chalk.green('[OK]')+' Launched Barada docs in your browser!')
        return this;
    },
    signup : function(){
        open(MIRIDOO_URL+'signup/barada');
        console.log(chalk.green('[OK]')+' Launched signup form in your browser!')
        return this;
    }
};


module.exports = {
    url,
    BASE_URL,
    browser
};
