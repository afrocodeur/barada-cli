var Chalk = require('chalk');

class Console {
    static write(text) {
        text = text.replace(/\{([a-zA-Z\.]+):([\s\S]*?)\}/iug, function(match, fonts, value){
            fonts = fonts.split('.');
            let font = Chalk;
            for(let item of fonts) {
                font = font[item];
            }

            return font(value.trim())
        });

        console.log(text);
    }

    static log(text, chalk, options = {}) {
        chalk = options.bold === true ? Chalk.bold : chalk || Chalk ;
        chalk = options.underline === true ? chalk.underline : chalk;
        chalk = options.background ? chalk['bg'+ucfirst(options.background)] || chalk : chalk;
        chalk = options.rgb ? chalk.rgb.apply(chalk, options.rgb) : chalk;

        console.log(chalk(text));
    }

    static error(text, options) {
        return Console.log(text, Chalk.red, options)
    }

    static info(text, options) {
        return Console.log(text, Chalk.blue, options)
    }

    static warning(text, options) {
        return Console.log(text, Chalk.yellow, options)
    }

    static success(text, options) {
        return Console.log(text, Chalk.green, options)
    }

    static custom(text, options) {
        return Console.log(text, Chalk, options)
    }
}

module.exports = Console;
