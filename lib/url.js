var open = require('open');
var chalk = require('chalk');
var fs = require('fs');


const BASE_URL = process.env.BASE_URL || 'https://barada.miridoo.com/api';
const BARADA_URL = process.env.BARADA_URL || 'https://barada.miridoo.com/';
const MIRIDOO_URL = process.env.MIRIDOO_URL || 'http://accounts.miridoo.com/';


console.log(BASE_URL)

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
        console.log(chalk.green('[OK]')+' Launched Barada docs in your browser!');
        return this;
    },
    signup : function(){
        open(MIRIDOO_URL+'signup/barada');
        console.log(chalk.green('[OK]')+' Launched signup form in your browser!');
        return this;
    }
};


module.exports = {
    url,
    BASE_URL,
    browser
};
