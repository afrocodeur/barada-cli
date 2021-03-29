const ConsolePrompt = require('../../../abstracts/ConsolePrompt')

class MigrationPrompt extends ConsolePrompt{

    questions() {
       return [
           {
               name: 'migrate',
               message: 'Do you want to launch migration and seed ?',
               type : 'list',
               choices: [
                   {name: 'No', value: ''},
                   {name: 'Only migrate', value: 'migrate'},
                   {name: 'Only seed', value: 'seed'},
                   {name: 'Migrate with seed', value: 'migrate-seed'},
               ]
           }
       ]
    }

    check() {
        return this.get('migrate') && this.get('migrate').length > 0;
    }

    migrate() {
        return this.get('migrate') === 'migrate';
    }

    seed() {
        return this.get('migrate') === 'seed';
    }

    all() {
        return this.get('migrate') === 'migrate-seed';
    }
}

module.exports = MigrationPrompt;
