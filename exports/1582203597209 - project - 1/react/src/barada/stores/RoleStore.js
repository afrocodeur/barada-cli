import mobx, { action, observable, runInAction, computed, decorate as decoration } from 'mobx';
import Role from 'app/models/Role';
import Store from 'barada/helpers/Store';
import {Api} from 'helpers/Api';


class RoleStore extends Store{

    __model = Role;


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
    RoleStore,
    decorate
};