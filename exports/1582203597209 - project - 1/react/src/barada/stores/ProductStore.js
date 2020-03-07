import mobx, { action, observable, runInAction, computed, decorate as decoration } from 'mobx';
import Product from 'app/models/Product';
import Store from 'barada/helpers/Store';
import {Api} from 'helpers/Api';


class ProductStore extends Store{

    __model = Product;


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
    ProductStore,
    decorate
};