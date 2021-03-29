const File = require('./File');

class EnvFile {

    path = '';
    values = [];
    valuesWithKey = {};

    constructor(path) {
        this.path = path;
        if(File.exists(path)) {
            this.parse(File.get(path));
        }
    }

    parse(content) {
        content.split(/\n/g).forEach(ligne => {
            if(/=/.test(ligne)) {
                ligne = ligne.split(/=/);
                let key = ligne.shift().trim();
                let value = ligne.join('=').trim();
                this.valuesWithKey[key] = value;
                this.values.push({key, value});
            }
            else {
                this.values.push(ligne);
            }
        });
        return this;
    }

    merge(values) {
        for(let key in values) {
            this.set(key, values[key]);
        }
        return this;
    }

    break(nb = 1) {
        for(let i = 0; i < nb; i++) {
            this.values.push('');
        }
        return this;
    }

    comment(comment) {
        this.values.push("#".concat(comment));
        return this;
    }

    set(key, value) {
        this.valuesWithKey[key] = value;
        for(let item of this.values) {
            if(item.key && item.key === key) {
                item.value = value;
                return this;
            }
        }
        this.values.push({key, value});
        return this;
    }

    json() {
        return JSON.clone(this.valuesWithKey);
    }

    get(key, default_value) {
        return this.valuesWithKey[key] || default_value;
    }

    save() {
        let content = [];
        for(let ligne of this.values) {
            content.push((typeof ligne === 'string') ? ligne : ligne.key+'='+ligne.value);
        }

        return File.write(this.path, content.join("\n"));
    }

}

module.exports = EnvFile;
