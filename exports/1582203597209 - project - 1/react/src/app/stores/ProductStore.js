import { observable, computed, action } from 'mobx';
import {decorate, ProductStore as BaradaProductStore} from 'barada/stores/ProductStore';

class ProductStore extends BaradaProductStore {

    $resource = 'product';


}

//decorate extends of mobx native decorate
decorate(ProductStore, {

});

export default ProductStore;