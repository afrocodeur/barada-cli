import {Model} from 'barada/helpers/Model';

export default class Product extends Model{

    $fields = ['id', 'name', 'description', 'price', 'devise', 'deleted_at', 'created_at', 'updated_at'];

    id = null; //@type number
    name = null; //@type string
    description = null; //@type string
    price = null; //@type string
    devise = null; //@type string
    deleted_at = null; //@type date
    created_at = null; //@type date
    updated_at = null; //@type date


}