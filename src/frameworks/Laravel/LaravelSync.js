
const File = require('../../utils/File');
const Console = require('../../commands/Console');

class LaravelSync {
    added = 0;
    updated = 0;
    removed = 0;

    authorized = ['routes'];

    sync(source, to) {

        File.copy(source, to, (stats, info) => {
            if(File.exists(info.to.path)) {
                if(!File.isDir(info.to.path)) {
                    let relative = info.to.path.replace(to, '');
                    this.copiable(File.pathinfo(relative)) ? this.updated++ : null;
                }
                else if(info.to.base === 'barada') {
                    File.copy(info.from.path, info.to.path);
                    return false;
                }
            }
            else {
                this.added++;
            }
            return true;
        });
    }

    copiable(info) {
        info.baseDir = info.dir.trim().replace(/^(\/|\\)/, '').split(/\/|\\/).shift();
        if(this.authorized.indexOf(info.baseDir) < 0) {
            return false;
        }
        if(File.exists('')) {

        }
        return true;
    }

}

module.exports = LaravelSync;
