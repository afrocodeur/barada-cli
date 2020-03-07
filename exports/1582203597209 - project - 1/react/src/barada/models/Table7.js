import {Model} from 'barada/helpers/Model';

export default class Table7 extends Model{

    $fields = ['id', 'command_id', 'product_id', 'deleted_at', 'created_at', 'updated_at'];

    id = null; //@type number
    command = null; //@type Command
    command_id = null; //@type number
    product = null; //@type Product
    product_id = null; //@type number
    deleted_at = null; //@type date
    created_at = null; //@type date
    updated_at = null; //@type date


}