const ConsolePrompt = require('../../../abstracts/ConsolePrompt');
const AuthService = require('../../../services/AuthService');

class LoginPrompt extends ConsolePrompt{

    questions() {
        let user = AuthService.user();

        return [
            {
                name : 'email',
                message : 'Email',
                default: (user ? user.email : ''),
                validate : function(value){
                    return (/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(value);
                }
            },
            {
                name : 'password',
                type : 'password',
                message : 'Password'
            }
        ]
    }

    check() {
        return this.get('email') && this.get('password');
    }

}

module.exports = LoginPrompt;
