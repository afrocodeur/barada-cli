import mobx, { action, observable, runInAction, computed, decorate as decoration } from 'mobx';
import User from 'app/models/User';
import Store from 'barada/helpers/Store';
import {Api} from 'helpers/Api';


class UserStore extends Store{

    __model = User;


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
    UserStore,
    decorate
};