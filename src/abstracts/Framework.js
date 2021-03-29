const DefaultService = require('../services/DefaultService');
var Console = require('../commands/Console');
var File = require('../utils/File');

class Framework {
    static Framework = '';
    Framework_NAME = '';
    Framework_FOLDER = '';
    /**
     *
     * @type {null|Command}
     */
    command = null;
    location = File.path('');

    setCommand(command) {
        this.command = command;
        return this;
    }

    async init(resource, data) { return null; }
    async pull(location, reset) {return null;}
    async reset(location = null) {
        Console.info("Reset the project");
        return await this.pull(location, true);
    }
    async install(resource, data) { return null; }
    async merge(source, to, resource, data) { return null; }
    async download(resource, data, to, action = 'build') {
        let load = this.command.load('Download barada files');
        try {
            if(data.project.id) {
                try {
                    let url = '';
                    let options = {};
                    if(['build'].indexOf(action) >= 0){
                        url = 'build/'+data.project.id+(resource?'/'+resource.id:'');
                    }
                    if(['pull', 'reset'].indexOf(action) >= 0){
                        let ref = data.ref;
                        if(action === 'reset') {
                            options = {reset: true, tag: true};
                            ref = 0;
                        }
                        url = 'pull/'+data.project.id+'/'+ref+(resource?'/'+resource.id:'');
                    }

                    let {data: response} = await DefaultService.Axios.post(url, options);
                    resource.build = response;
                    let {stream, name, path} = await DefaultService.download(resource, data, to);
                    let extract_to = to.concat('/' + File.pathinfo(name, File.PATHINFO_NAME));
                    let state = await DefaultService.unzip(path, extract_to);
                    File.unlink(path);
                    load.stop();

                    return {stream, extract_to, path};
                }catch (e) {
                    Console.error(e.message);
                }
            }
            else {
                Console.error('Project Id absent.');
            }
        }catch (e) {
            Console.error(e.message);
        }
        return null;
    }

    configs() {
        let configs = null
        if(File.exists(this.location + '/barada.json')) {
            configs = File.getJson(this.location + '/barada.json');
        }
        configs = configs || {};
        configs.framework = configs.framework || this.Framework_NAME;

        return configs;
    }
    cacheFolder() {
        let location = this.location.concat('/.barada');
        if(!File.exists(location)) {
            File.mkpath(location);
        }
        return location; // .concat('/' + this.Framework_FOLDER);
    }

    async saveConfigFile(custom) {
        let configs = this.configs();
        configs = JSON.merge(configs, custom);
        File.write(this.location.concat('/barada.json'), configs);
        return configs;
    }
}

module.exports = Framework;
