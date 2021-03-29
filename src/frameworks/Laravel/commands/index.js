const InitCommand = require('./init/InitCommand');
const MigrateCommand = require('./migrate/MigrateCommand');
const TagCommand = require('./tag/TagCommand');
const PullCommand = require('./pull/PullCommand');
const ResetCommand = require('./reset/ResetCommand');


module.exports = [
    InitCommand,
    PullCommand,
    ResetCommand,
    MigrateCommand,
    TagCommand
]
