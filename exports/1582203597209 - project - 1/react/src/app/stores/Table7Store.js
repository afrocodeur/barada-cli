import { observable, computed, action } from 'mobx';
import {decorate, Table7Store as BaradaTable7Store} from 'barada/stores/Table7Store';

class Table7Store extends BaradaTable7Store {

    $resource = 'table7';


}

//decorate extends of mobx native decorate
decorate(Table7Store, {

});

export default Table7Store;