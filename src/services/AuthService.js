const Configstore = require('configstore');
const DefaultService = require("./DefaultService");
const Console = require("../commands/Console");


class AuthService extends DefaultService{
    static STORAGE = new Configstore('barada-cli', {token : null});

    static user() {
        return AuthService.STORAGE.get('user');
    }

    static guest() {
        return AuthService.user() === null;
    }

    static verify() {
        if(AuthService.check()) {
            let user = AuthService.user();
            DefaultService.token(user.token);
        }
    }

    static check() {
        return AuthService.user() && AuthService.user().token;
    }

    static set(user) {
        AuthService.STORAGE.set('user', user);
    }

    static async login(user) {
        try {
            let {data} = await DefaultService.Axios.post('/login', user);
            if(data && data.token) {
                DefaultService.token(data.token);
                user.token = data.token;
                AuthService.set(user);
                return data;
            }
            return null;
        }catch (e) {
            return null;
        }
    }

    static async logout() {
        try {
            let {data} = await DefaultService.Axios.post('/logout');
            if(data) {
                DefaultService.token('');
                AuthService.set(null);
            }
            return data;
        }catch (e) {
            console.log(e);
        }
    }

}

module.exports = AuthService;
