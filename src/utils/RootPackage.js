

class RootPackage {
    static NAME = '';
    static VERSION = '';

    static load(dir) {
        let json = require(dir.concat('/package.json'));
        RootPackage.NAME = json.name;
        RootPackage.VERSION = json.version;
    }
}

module.exports = RootPackage;
