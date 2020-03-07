import {Model} from 'barada/helpers/Model';

export default class Role extends Model{

    $fields = ['id', 'title', 'description', 'deleted_at', 'created_at', 'updated_at'];

    id = null; //@type number
    title = null; //@type string
    description = null; //@type string
    deleted_at = null; //@type date
    created_at = null; //@type date
    updated_at = null; //@type date


}