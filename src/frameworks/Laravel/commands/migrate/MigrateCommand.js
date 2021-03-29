const Command = require('../../../../commands/Command');

class MigrateCommand extends Command{
    static SIGNATURE = 'migrate';
    static GLOBAL_HELP_IGNORE = false;
    static DESCRIPTION = 'run php artisan migrate for all migrations created by barada';

    async handler() {
        return super.handler();
    }
    static async migration(seed = false) {
        await this.exec('php', 'artisan migrate --path="database/migrations/barada"' + (seed ? ' --seed' : ''));
    }
}

module.exports = MigrateCommand;
