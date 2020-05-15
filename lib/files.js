const fs = require('fs');
const path = require('path');

module.exports = files = {
    fs : fs,

    path : path,

    cwd: (filePath) => {
        return process.cwd()+'/'+filePath;
    },

    directory: () => {
        return path.basename(process.cwd());
    },

    remove: (path, cwd) => {
        return fs.unlinkSync(cwd ? files.cwd(path) : path);
    },

    removeDir: (source, keep = false) => {
        let stat = fs.statSync(source);
        if(stat.isDirectory()){
            let dirfiles = fs.readdirSync(source, {});
            dirfiles.forEach((file) => {
                let directpath = source + '/' + file;
                let stat = fs.statSync(directpath);
                if(stat.isDirectory()){
                    files.removeDir(directpath);
                }
                else fs.unlinkSync(directpath);
            });
            (!keep) ? fs.rmdirSync(source) : null;
        }
    },
    copy: (source, to, filter = null, infos = {}, lastMoment) => {
        // statSync
        infos.source = infos.source || source;
        infos.to = infos.to || to;
        let stat = fs.statSync(source);

        if(stat.isDirectory()){
            let dirfiles = fs.readdirSync(source, {});
            dirfiles.forEach((file) => {
                let directpath = source+'/'+file;
                let stat = fs.statSync(directpath);
                infos.relative = directpath.replace(infos.source, '');

                if(filter === null || (typeof filter === 'function' && filter(directpath, stat, infos, files, lastMoment))){
                    if(stat.isDirectory()){
                        let todir = to+'/'+file;
                        !fs.existsSync(todir) ? fs.mkdirSync(todir) : null;
                        files.copy(directpath, todir, filter, infos, lastMoment);
                    }
                    else {
                        fs.copyFileSync(source+'/'+file, to+'/'+file);
                    }
                }
            });
        }
        else {
            if(filter === null || (typeof filter === 'function' && filter(source, fs.statSync(source), infos))) fs.copyFileSync(source, to);
        }
    },

    absolute: (file, cwd) => {
        return cwd ? files.cwd(file) : file;
    },

    exists: (file, cwd = true) => {
        return fs.existsSync(files.absolute(file, cwd));
    },

    read: (file, cwd = true) => {
        return fs.readFileSync(files.absolute(file, cwd), 'utf-8');
    },

    save: (file, content, cwd = true) => {
        return fs.writeFileSync(files.absolute(file, cwd), content, 'utf-8');
    },

    move: (source, destination) => {
        return new Promise((resolve, reject) => {
            fs.rename(source, destination, (err) => {
                (err) ? reject(err) : resolve();
            });
        });
    },

    get: (file, cwd = true) => {
        let content = files.read(file, cwd);
        if(path.extname(file) === '.json'){
            return JSON.parse(content);
        }
        return content;
    },

    file: (file, content = false) => {
        return content ? files.get(file) : files.exists(file);
    },

    composer: (content = false) => {
        return files.file('composer.json', content);
    }
};
