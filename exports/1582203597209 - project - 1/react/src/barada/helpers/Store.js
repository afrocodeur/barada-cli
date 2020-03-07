import {Api} from 'helpers/Api';

var $$ref = 0;

export default class Store {
    $resource = '';
    __all = {};
    __currents = [];

    __model = null;

    constructor() {
        if(typeof this.$resource === 'string'){
            this.$resource = {
                all : {url: this.$resource, method: 'GET'},
                find : {url: this.$resource+'/:id', method: 'GET'},
                store : {url: this.$resource, method: 'POST'},
                update : {url: this.$resource+'/:id', method: 'PUT'},
                destroy : {url: this.$resource+'/:id', method: 'DELETE'},
            };
        }
    }

    create = (values = {}) => {
        $$ref++;
        let model = new this.__model(values);
        model.$ref = $$ref;

        this.__currents.push(model);
        return model;
    };

    reset = () => {
        this.__currents = [];
        return this;
    };

    find = async (id, params = {}) => {
        try{
            let {data} = await Api.get(this.$resource.find.url.replace(':id', id), params);
            console.log(data)
            return data;
        }catch (e) {
            console.log('Error : '+this.__model.constructor.name+' Find');
            throw new Error(e);
        }
    };

    all = async (id, params = {}) => {
        try{
            let {data} = await Api.get(this.$resource.all.url, params);
            console.log(data)
            return data;
        }catch (e) {
            console.log('Error : '+this.__model.constructor.name+' All');
            throw new Error(e);
        }
    };
}