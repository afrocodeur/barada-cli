const Console = process.import('src/commands/Console');

class ProcessArgBuilder {

    launcher = '';
    options = {};
    args = {};

    errors = [];

    constructor(argv, typed = false) {
        if(typeof argv === 'string') {
            argv = argv.split(' ');
        }
        argv.forEach((item, index) => {
            if(index === 0) {
                if(!/^--/.test(item)) {
                    this.launcher = item;
                    return;
                }
            }

            if(typed) {
                this.description(item, index);
            }
            else {
                this.load(item, index);
            }
        });
    }
    option(name, defaultValue = undefined) {
        return this.options[name] || defaultValue;
    }

    argument(name, defaultValue = undefined) {
        return this.args[name] || defaultValue;
    }

    toKeyValue(item) {
        let parts = item.split('=');
        let key = parts.splice(0, 1).join(''), value = parts.join('=');

        return {key, value};
    }

    load(item, index) {
        item = this.toKeyValue(item);

        if(/^--/.test(item.key)) {
            this.options[item.key.replace(/^--/, '')] = item.value;
        }
        else {
            this.args[item.key] = item.value;
        }
        return this;
    }

    description(item, index) {
        let description = null;
        if(/^{/.test(item) && /}$/.test(item)) {
            description = {};
            item = item.replace(/{|}/g, '');
            if(/\?$/.test(item)) {
                item = item.replace(/\?$/, '');
                description.nullable = true;
            }
            item = this.toKeyValue(item);
            let [value, type] = item.value.split(':');
            if(type) {
                type = type.toLowerCase();
                type = type[0].toUpperCase()+type.substring(1);
            }
            description.type = (global[type] === Boolean ? (value) => ( value.toString() === 'true') : global[type]);
            description.default = description.type ? description.type(value) : value;

            if(/^--/.test(item.key)) {
                this.options[item.key.replace(/^--/, '')] = description;
            }
            else {
                this.args[item.key] = description;
            }
        }
        return this;
    }
    error() { return this.errors.length > 0; }

    match(command) {
        this.errors = [];

        if(command && typeof command.SIGNATURE === 'string') {
            let builder = new ProcessArgBuilder(command.SIGNATURE.concat(' {--help=true:boolean}').split(/\s/g), true);
            if(builder.launcher === this.launcher) {
                this.matchArguments(builder);
                this.matchOptions(builder);

                if(!this.error()) {
                    let item = new command();
                    item.args = this.args;
                    item.options = this.options;
                    return item;
                }
            }
        }
        return false;
    }

    matchArguments(builder) {
        for(let argument in this.args) {
            let arg = builder.argument(argument);
            if(arg !== undefined) {
                this.args[argument] = this.args[argument] || arg.default;
                if(arg.type) {
                    this.args[argument] = arg.type(this.args[argument]);
                }
            }
            else {
                console.log('unknown argument: --' + argument);
                // this.errors.push({type: 'argument', name: argument, unknown: true});
            }
        }
    }
    matchOptions(builder) {
        for(let option in this.options) {
            let opt = builder.option(option);
            if(opt !== undefined) {
                this.options[option] = this.options[option] || opt.default;
                if(opt.type) {
                    this.options[option] = opt.type(this.options[option]);
                }
            }
            else {
                console.log('unknown option: --' + option);
                // this.errors.push({type: 'option', name: option, unknown: true});
            }
        }
    }

}

module.exports = ProcessArgBuilder;
