import mobx, { action, observable, runInAction, computed, decorate as decoration } from 'mobx';
import Command from 'app/models/Command';
import Store from 'barada/helpers/Store';
import {Api} from 'helpers/Api';


class CommandStore extends Store{

    __model = Command;


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
    CommandStore,
    decorate
};