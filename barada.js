var clear = require('clear');
var chalk = require('chalk');
var figlet = require('figlet');
const meow = require('meow');
const foo = require('.');

process.rootPath = __dirname;

var inspector = require('./lib/inspector');

// clear();

var framework = inspector.check();
