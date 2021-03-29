const Path = require('path');

const dirname = Path.resolve(__dirname, '../../');

process.rootPath = dirname;
process.import = function(path) { return require(dirname+'/'+path); };
