import {Model} from 'barada/helpers/Model';

export default class PasswordReset extends Model{

    $fields = ['id', 'email', 'token', 'deleted_at', 'created_at', 'updated_at'];

    id = null; //@type number
    email = null; //@type string
    token = null; //@type string
    deleted_at = null; //@type date
    created_at = null; //@type date
    updated_at = null; //@type date


}