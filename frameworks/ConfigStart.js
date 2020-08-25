var fs = require('fs');
var chalk = require('chalk');
var files = require('../lib/files');

/**
 *  write the barada config file when user start new project from existing online project
 * @param config
 * @returns {null}
 * @constructor
 */
var ConfigWriter = function(config){

    const folder = './'+config.folder;

    var configs = {folder: config.folder, type: 'project'};

    // if (fs.existsSync(folder+'/barada.json')){
    //     configs = require(folder+'/barada.json');
    // }
    configs.project = {
        name : config.project.name,
        id : config.project.id
    };
    configs.resources = [];

    var resources = [];

    for (let resource of config.resources) {
        let values = {};

        try{
            values = JSON.parse(resource.pivot.params);
        }catch (e) { }

        configs.resources.push({id : resource.id, name : resource.name, params : values});
        resources.push({id : resource.id, name : resource.name, params : values})
    }

    // if it's start command
    if (!fs.existsSync(folder)){
        // create the common directory
        fs.mkdirSync(folder);

        // create the config file
        fs.writeFileSync(folder+'/barada.json', JSON.stringify(configs, null, 4), 'utf8');

        return configs;
    }
    else {
        if(config.folder) {
            console.log(chalk.red('[error]')+' the folder '+chalk.yellow(config.folder)+' already exists');
        }
    }

    return configs;

};


module.exports = {
    ConfigWriter
};
