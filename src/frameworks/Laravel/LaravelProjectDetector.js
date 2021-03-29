const FrameworkDetector = require('../../abstracts/FrameworkDetector');
const LaravelFramework = require('./LaravelFramework');
const File = require('../../utils/File');
const Commands = require('./commands');



class LaravelProjectDetector extends FrameworkDetector{
    static FRAMEWORK_NAME = 'laravel';

    Frmework = LaravelFramework;

    check(check = null) {
        return super.check(() => {
            let composer = File.getJson('composer.json');
            return (composer && composer.require && composer.require['laravel/framework'] !== undefined);
        });
    }

    commands() {
        return Commands;
    }

    manager() {
        return super.manager();
    }
}

module.exports = LaravelProjectDetector;
