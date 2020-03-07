import {Model} from 'barada/helpers/Model';

export default class Command extends Model{

    $fields = ['id', 'name', 'description', 'user_id', 'deleted_at', 'created_at', 'updated_at'];

    id = null; //@type number
    name = null; //@type string
    description = null; //@type string
    user = null; //@type User
    user_id = null; //@type number
    deleted_at = null; //@type date
    created_at = null; //@type date
    updated_at = null; //@type date


}