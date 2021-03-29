const Command = require('../../../commands/Command');
const Console = require('../../../commands/Console');

const AuthService = require('../../../services/AuthService');


class LogoutCommand extends Command{
    static SIGNATURE = 'logout';
    static DESCRIPTION = 'Log out of barada';

    async handler() {
        if(AuthService.check()) {
            let questions = await this.confirm('Are you sure ?');

            if(questions.check()) {
                const load = this.load('Log out of Barada');
                try {
                    let out = await AuthService.logout();
                    load.stop();
                    Console.success('[ok] You are logged out.')
                }catch (e){
                    load.stop();
                    Console.error('[error] You are already logged out.')
                }
            }
        }
        else {
            Console.error("[ERROR] You're not logged");
        }
    }
}

module.exports = LogoutCommand;
