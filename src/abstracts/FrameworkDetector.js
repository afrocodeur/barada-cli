const Framework = require('./Framework');
const File = require('../utils/File');

class FrameworkDetector {
    static FRAMEWORK_NAME = '';
    Frmework = Framework;

    check(check = null) {
        let configs = this.configs();
        if(configs && configs.framework) {
            return this.Frmework.Framework.toLowerCase() === configs.framework.toLowerCase();
        }
        return check ? check.apply(this) : false;
    }

    framework(command) {
        let framework = new this.Frmework();
        framework.setCommand(command);
        return framework;
    }

    version() {
        return null;
    }

    supported() {
        return true;
    }

    commands() {
        return [];
    }

    manager() {
        return null;
    }

    mine(command) {
        let commands = this.commands();
        for(let item of commands) {
            if(command instanceof item) {
                return true;
            }
        }
        return false;
    }

    configs() {
         return File.exists('barada.json') ? File.getJson('barada.json') : null;
    }
}


module.exports = FrameworkDetector;
