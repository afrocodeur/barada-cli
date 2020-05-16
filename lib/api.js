const Configstore = require('configstore');

var Axios = require('axios');
var Path = require('path');
var Fs = require('fs');
var Chalk = require('chalk');
var Unziper = require('unzipper');

var {url, BASE_URL} = require('./url');

const config = new Configstore('barada-cli', {token : null});

const request = Axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'text/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*'
    }
});

// Add a response interceptor
request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    return Promise.reject(error);
});

var api = {

    /**
     * log in to your barada account
     * @param credentials
     * @returns {Promise<any>}
     */
    login : function(credentials){

        return new Promise((resolve, reject) => {
            request.post(url.login, credentials)
                .then( ({data}) => {
                    if(data.check){
                        config.set('user', {token : data.token, email : credentials.email});
                    }
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    /**
     * get the current user
     * @returns {token, email}
     */
    user : function(){
        return config.get('user');
    },

    logged : function(){
        const user = this.user();

        return user && user.token;
    },

    /**
     * download project files
     * @param id
     * @param resource
     * @param progress
     * @returns {Promise<any>}
     */
    build : function(id, resource = null, progress = null){
        return new Promise((resolve, reject) => {
            request.post(url.build+'/'+id+(resource?'/'+resource:''))
                .then(({data}) => {
                    api.download(data, id, resource, progress).then(resolve).catch(reject);
                }).catch(reject);
        });
    },

    download : function(data, id, resource, progress){
        return new Promise((resolve, reject) => {
            progress ? progress.to(40) : null
            request.get(url.download+'/'+data.id+(resource?'/'+resource:''), {
                responseType: 'stream',
                progress : (event) => {
                    console.log('download', event)
                }
            }).then((response) => {
                api.saveAndUnzip(response, id).then((infos) => {
                    infos.activity = data;
                    resolve(infos)
                }).catch(reject)
            }).catch(reject);
        });
    },

    pull : function(project, ref, resource = null, progress){
        return new Promise((resolve, reject) => {
            request.post(url.pull+'/'+project+'/'+ref+(resource?'/'+resource:''))
                .then(({data}) => {

                    api.download(data, project, resource, progress).then(resolve).catch(reject);

                }).catch(reject);
        });
    },

    /**
     * save file and unzip it
     * @param response
     * @returns {Promise<any>}
     */
    saveAndUnzip : (response, id) => {
        return new Promise((resolve, reject) => {
            // configure the save path of the file
            const file = (new Date()).getTime()+' - project - '+id;
            const path = Path.resolve(process.rootPath, 'exports', file+'.zip');
            const extractPath = Path.resolve(process.rootPath, 'exports', file);
            const writer = Fs.createWriteStream(path);

            // save the file
            response.data.pipe(writer);

            // response.data.pipe(writer);
            writer.on('finish', () => {
                const writer = Fs.createReadStream(path).pipe(Unziper.Extract({ path: extractPath}));
                writer.on('finish', () => {
                    try { Fs.unlinkSync(path); } catch(err) { console.error(err); }
                    setTimeout(() => { resolve({path: extractPath}); }, 1000);
                });
                writer.on('error', reject);
            });
            writer.on('error', reject);
        });
    },



    /**
     * log out of barada
     * @returns {Promise<any>}
     */
    logout : function(){
        return new Promise((resolve, reject) => {
            request.post(url.logout)
                .then( ({data}) => {
                    config.delete('user');
                    resolve(data);
                })
                .catch((error) => {
                    config.delete('user');
                    reject(error);
                });
        });
    },

    /**
     * get user projects
     * @returns {Promise<any>}
     */
    projects : function(){
        return new Promise((resolve, reject) => {
            request.post(url.projects).then(({data}) => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },

    project : function(id){
        return new Promise((resolve, reject) => {
            request.get(url.projects+'/'+id).then(({data}) => {
                resolve(data);
            }).catch(error => { reject(error); });
        });
    }

};

/*
 * Add the authentication token to the requester
 */
const user = api.user();

if(user && user.token){
    request.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
}

module.exports = {
    api
};
