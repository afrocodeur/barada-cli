const LoginCommand = require('./login/LoginCommand');
const BaradaCommand = require('./barada/BaradaCommand');
const LogoutCommand = require('./logout/LogoutCommand');
const DocsCommand = require('./docs/DocsCommand');
const SignupCommand = require('./signup/SignupCommand');
const StartCommand = require('./start/StartCommand');
const PullCommand = require('./pull/PullCommand');
const ResetCommand = require('./reset/ResetCommand');
const ServeCommand = require('./serve/ServeCommand');
const UpdateCommand = require('./update/UpdateCommand');



module.exports = [
    BaradaCommand,
    DocsCommand,
    SignupCommand,
    LoginCommand,
    LogoutCommand,
    StartCommand,
    // PullCommand,
    // UpdateCommand,
    // ServeCommand,
    // ResetCommand
]
