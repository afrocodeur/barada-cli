const Fs = require('fs');
const Path = require('path');

class File {

    static PATHINFO_DIR = 'dir';
    static PATHINFO_BASENAME = 'base';
    static PATHINFO_EXT = 'ext';
    static PATHINFO_NAME = 'name';

    static path(subpath){
        return Path.resolve(process.cwd(), subpath);
    }

    static exists(path) {
        return Fs.existsSync(File.path(path));
    }

    static mkpath(path) {
        return Fs.mkdirSync(File.path(path), {recursive: true});
    }

    static isDir(path) {
        return File.stats(path).isDirectory();
    }

    static toString(content) {
        if(typeof content === 'object') {
            content = JSON.stringify(content, null, 4);
        }
        else content = content.toString();
        return content;
    }

    static writeInto(path, content, options = 'utf8') {
        return Fs.appendFileSync(path, File.toString(content), options);
    }

    static write(path, content, options = 'utf8') {
        return Fs.writeFileSync(path, File.toString(content), options);
    }

    static stats(path) {
        return Fs.statSync(path);
    }

    static pathinfo(path, value = null) {
        let info = Path.parse(path);
        if(value && info[value]) {
            return info[value];
        }
        info.path = path;
        return info;
    }

    static info(path) {
        return Fs.statSync(path);
    }

    static files(path) {
        return Fs.readdirSync(path, {});
    }

    static get(path) {
        try{
            return Fs.readFileSync(path, 'utf8');
        }catch (e) {
            console.log(e.message);
        }
    }

    static getJson(path) {
        try {
            path = File.path(path);
            if(File.exists(path)) {
                return JSON.parse(Fs.readFileSync(path, 'utf8'));
            }
        }catch (e) {
            console.log(e.message);
        }
        return null;
    }

    static unlink(path) {
       return Fs.unlinkSync(path);
    }

    static rmDir(path, itself = true, exception = undefined) {
        let source = File.path(path);

        if(File.exists(source)){
            let info = File.stats(path);
            if(info.isDirectory()){
                File.files(path).forEach( file => {
                    let subpath = source + '/' + file;
                    let info = File.stats(subpath);
                    if(!exception || exception.apply(File, [file, subpath, info])) {
                        if(info.isDirectory()){
                            File.rmDir(subpath, true);
                        }
                        else {
                            File.unlink(subpath);
                        }
                    }
                });
                if(itself) {
                    Fs.rmdirSync(source);
                }
            }
        }
    }

    static rmFile(path) {
        return Fs.unlinkSync(path);
    }

    static copy(source, destination, filter = null) {
        let stat = Fs.statSync(source);
        if(stat.isDirectory()) {
            let dirfiles = File.files(source);

            dirfiles.forEach((file) => {
                let sub_source = source+'/'+file;
                let sub_destination = destination+'/'+file;
                let file_stat = Fs.statSync(sub_source);
                if(!filter || (filter(file_stat, {from: File.pathinfo(sub_source), to: File.pathinfo(sub_destination)}) === true)) {
                    if (file_stat.isDirectory()) {
                        if (!Fs.existsSync(sub_destination)) {
                            Fs.mkdirSync(sub_destination);
                        }
                        File.copy(sub_source, sub_destination, filter);
                    } else {
                        Fs.copyFileSync(sub_source, sub_destination);
                    }
                }
            });
        }
        else {
            if(!filter || filter(stat, {from: File.pathinfo(source), to: File.pathinfo(destination)}) === true) {
                Fs.copyFileSync(source, destination);
            }
        }
    }
}

module.exports = File;
