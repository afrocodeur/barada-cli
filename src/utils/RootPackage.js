

class RootPackage {
    static NAME = '';
    static VERSION = '';
    static BUILD_VERSION = 0;

    static load(dir) {
        let json = require(dir.concat('/package.json'));
        RootPackage.NAME = json.name;
        RootPackage.VERSION = json.version;
        RootPackage.BUILD_VERSION = parseInt(json.version.replace(/\./g, ''));
    }
}

module.exports = RootPackage;
