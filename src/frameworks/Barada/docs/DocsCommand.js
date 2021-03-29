const Command = require('../../../commands/Command');
const Console = require('../../../commands/Console');

const DefaultService = require('../../../services/DefaultService');

const Open = require('open');

class DocsCommand extends Command{
    static SIGNATURE = 'docs {--search=:string}';
    static DESCRIPTION = 'Open the barada documentation website';

    async handler() {
        Open(DefaultService.url('docs'));
        Console.write('{green.bold: [OK]} Launched Barada docs in your browser!');
        return this;
    }
}

module.exports = DocsCommand;
