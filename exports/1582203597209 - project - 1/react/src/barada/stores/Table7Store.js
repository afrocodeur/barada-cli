import mobx, { action, observable, runInAction, computed, decorate as decoration } from 'mobx';
import Table7 from 'app/models/Table7';
import Store from 'barada/helpers/Store';
import {Api} from 'helpers/Api';


class Table7Store extends Store{

    __model = Table7;


}

const decorations = {
    __data: observable,
    __currents: observable.deep,

    find: action,
    reset: action,
    all: action,
    create: action
};

function decorate(object, description){
    return decoration(object, Object.assign({}, decorations, description))
}

export {
    Table7Store,
    decorate
};