var clear = require('clear');
var chalk = require('chalk');
var figlet = require('figlet');
const meow = require('meow');
const foo = require('.');

require('dotenv').config({ path: __dirname+'/.env' });

process.rootPath = __dirname;

var inspector = require('./lib/inspector');

// clear();

var framework = inspector.check();
