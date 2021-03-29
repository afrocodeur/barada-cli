const LoginPrompt = require("./LoginPrompt");

const AuthService = require("../../../services/AuthService");

const Command = require('../../../commands/Command');
const Console = require('../../../commands/Console');

class LoginCommand extends Command{
    static SIGNATURE = 'login';
    static DESCRIPTION = 'Log in to barada';

    async handler() {
        const user = AuthService.user();

        if(AuthService.guest()){
            Console.write(('{blue.bold: [INFO]}')+' Log into your Barada account!');
            Console.write('\tIf you don\'t have one yet, create yours by running: {green.bold: barada signup}\n');
        }
        else {
            Console.write(('{yellow.bold: [WARN]}')+' You will be logged out.');
            Console.write('\tYou are already logged in as {yellow.bold: '+user.email+'}! Prompting for new credentials.');
            Console.write('\tUse {red.bold: Ctrl+C} to cancel and remain logged in.\n')
        }

        let questions = await (new LoginPrompt()).prompt();
        const load = this.load('Authentication');

        if(questions.check()) {
            try {
                let data = await AuthService.login(questions.all());
                load.stop();
                if(data && data.token) {
                    Console.success('[success] You are logged in!');
                    return data;
                }
                else {
                    Console.error('[error] These credentials do not match our records.');
                }
                return data;
            }
            catch (e) {
                load.stop();
                Console.error('[error] These credentials do not match our records.');
            }
        }

    }
}

module.exports = LoginCommand;
