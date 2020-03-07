import mobx, { action, observable, runInAction, computed, decorate as decoration } from 'mobx';
import UserRole from 'app/models/UserRole';
import Store from 'barada/helpers/Store';
import {Api} from 'helpers/Api';


class UserRoleStore extends Store{

    __model = UserRole;


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
    UserRoleStore,
    decorate
};