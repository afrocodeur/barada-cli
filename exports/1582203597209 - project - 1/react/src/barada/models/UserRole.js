import {Model} from 'barada/helpers/Model';

export default class UserRole extends Model{

    $fields = ['id', 'user_id', 'role_id', 'deleted_at', 'created_at', 'updated_at'];

    id = null; //@type number
    user = null; //@type User
    user_id = null; //@type number
    role = null; //@type Role
    role_id = null; //@type number
    deleted_at = null; //@type date
    created_at = null; //@type date
    updated_at = null; //@type date


}