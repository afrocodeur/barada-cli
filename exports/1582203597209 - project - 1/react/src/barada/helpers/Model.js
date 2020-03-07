import mobx, { action, observable, runInAction, computed, decorate as decoration } from 'mobx';

class Model {

    $json = [];
    $store = null;
    $resource = null;

    constructor(object) {
        this.cast(object)
    }


    /**
     * get the fields as json elements
     */
    json() {
        let json = {};
        (this.$json || []).forEach((key) => { json[key] = this[key] })

        return json
    }

    /**
     * cast the object to the Model
     * @param object
     * @returns {Model}
     */
    cast = (object) => {
        for(let key in object) {
            this[key] = (this.$casts && this.$casts[key]) ? this.$casts[key].apply(this, [object[key]]) : object[key]
        }

        return this;
    };

    /**
     * change the model properties
     * @param property
     * @param value
     * @returns {Model}
     */
    set = (property, value) => {
        this[property] = value;
        return this;
    };
}

const decorations = {
    set: action,
    cast: action
};

function decorate(object, description){
    return decoration(object, Object.assign({}, decorations, description))
}

export { Model, decorate };