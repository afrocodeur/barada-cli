const Axios = require("axios");
const AuthService = require("./AuthService");
const Console = require("../commands/Console");
const File = require("../utils/File");
const Unziper = require('unzipper');
const Fs = require("fs");

class DefaultService {

    static BASE_URL = 'https://barada.miridoo.com/api/';
    static BARADA_URL = 'https://barada.miridoo.com/';
    static MIRIDOO_URL = 'http://accounts.miridoo.com/';
    static AUTH_TOKEN = null;
    static Axios = null;



    static token(token) {
        DefaultService.Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    static env(env) {
        DefaultService.BASE_URL = env.BASE_URL || DefaultService.BASE_URL;
        DefaultService.BARADA_URL = env.BARADA_URL || DefaultService.BARADA_URL;
        DefaultService.MIRIDOO_URL = env.MIRIDOO_URL || DefaultService.MIRIDOO_URL;

        DefaultService.Axios = Axios.create({
            baseURL: DefaultService.BASE_URL,
            headers: {
                'Accept': 'text/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            }
        });

        return this;
    }

    static async download(resource, data, to) {
        try {
            let {data: stream, header} = await DefaultService.Axios.get('download/'+resource.build.id+(resource?'/'+resource.id:''), {
                responseType: 'stream',
                progress : (event) => {
                    console.log('download', event)
                }
            });

            let file = (new Date()).getTime() + '.unknown';
            try{
                if(stream.headers && stream.headers['content-disposition']) {
                    file = stream.headers['content-disposition']
                        .split(';')
                        .pop()
                        .trim()
                        .replace('filename=', '')
                        .replace(/"/g, '');
                }
            }catch (e) { }
            const path = File.path(to.concat('/'+file));
            const writer = Fs.createWriteStream(path);

            stream.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on('finish', () => (resolve({stream, name: file, path})));
                writer.on('error', reject);
            });
        }catch (e) {
            Console.error(e.message);
        }
    }

    static async unzip(source, to) {
        return new Promise((resolve, reject) => {
            const writer = Fs.createReadStream(source).pipe(Unziper.Extract({ path: to}));
            writer.on('finish', () => {
                setTimeout(()=> (resolve(true)), 2000);
            });
            writer.on('error', reject);
        });
    }

    static url(path) {
        return DefaultService.BARADA_URL.concat(path);
    }

    static miridoo(path) {
        return DefaultService.MIRIDOO_URL.concat(path);
    }
}


module.exports = DefaultService;
