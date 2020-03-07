import mobx, { action, observable, runInAction, computed, decorate as decoration } from 'mobx';
import {default as BaradaTable7} from 'barada/models/Table7';
import {decorate} from 'barada/helpers/Model';
import Command from 'app/models/Command';
import Product from 'app/models/Product';

class Table7 extends BaradaTable7 {

    // $json = ['id', 'command_id', 'product_id', 'deleted_at', 'created_at', 'updated_at']

    id=null; // @type number
    command=null; //@type Command
    command_id=null; // @type number
    product=null; //@type Product
    product_id=null; // @type number
    deleted_at=null; // @type date
    created_at=null; // @type date
    updated_at=null; // @type date

    $casts = {
        command: (object) => (new Command(object)),
        product: (object) => (new Product(object)),
    };

}

decorate(Table7, {
    id: observable,
    command: observable,
    command_id: observable,
    product: observable,
    product_id: observable,
    deleted_at: observable,
    created_at: observable,
    updated_at: observable,
});

export default Table7