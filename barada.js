require('./src/helpers/process');
require('./src/helpers/String');
require('./src/helpers/Json');

const Barada = require('./src/Barada');
const RootPackage = require('./src/utils/RootPackage');
const AuthService = require('./src/services/AuthService');
const DefaultService = require('./src/services/DefaultService');

var clear = require('clear');
// var chalk = require('chalk');
// var figlet = require('figlet');
// const meow = require('meow');
// const foo = require('.');

// var inspector = require('./lib/inspector');
// var abstracts = inspector.check();

// clear();

require('dotenv').config({ path: __dirname+'/.env' });

RootPackage.load(__dirname);
DefaultService.env(process.env);
AuthService.verify();

let barada = (new Barada());
barada.start();
