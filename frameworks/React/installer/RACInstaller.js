const chalk = require('chalk');


module.exports = (function RACInstaller(){

    return {
        install: function(resource, options, files){
            return new Promise((resolve, reject) => {
                let cmd = {
                    install : 'npx create-react-app '+options.resource.folder
                };
                let subfolder = options.resource.configs.folder;

                console.log(chalk.green(cmd.install));

                this.exec(cmd.install, {
                    cwd: files.cwd(subfolder)
                }).then(stdout => {

                    resolve(stdout);
                }).catch(stderr => {
                    console.log(stderr);
                    // reject(stderr);
                });
            });
        }
    };
}());
