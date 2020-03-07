import mobx, { action, observable, runInAction, computed, decorate as decoration } from 'mobx';
import {default as BaradaProduct} from 'barada/models/Product';
import {decorate} from 'barada/helpers/Model';

class Product extends BaradaProduct {

    // $json = ['id', 'name', 'description', 'price', 'devise', 'deleted_at', 'created_at', 'updated_at']

    id=null; // @type number
    name=null; // @type string
    description=null; // @type string
    price=null; // @type string
    devise=null; // @type string
    deleted_at=null; // @type date
    created_at=null; // @type date
    updated_at=null; // @type date

    $casts = {
    };

}

decorate(Product, {
    id: observable,
    name: observable,
    description: observable,
    price: observable,
    devise: observable,
    deleted_at: observable,
    created_at: observable,
    updated_at: observable,
});

export default Product