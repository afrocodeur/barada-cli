import mobx, { action, observable, runInAction, computed, decorate as decoration } from 'mobx';
import PasswordReset from 'app/models/PasswordReset';
import Store from 'barada/helpers/Store';
import {Api} from 'helpers/Api';


class PasswordResetStore extends Store{

    __model = PasswordReset;


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
    PasswordResetStore,
    decorate
};