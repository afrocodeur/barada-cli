import {Model} from 'barada/helpers/Model';

export default class User extends Model{

    $fields = ['id', 'firstname', 'lastname', 'email', 'password', 'email_verified_at', 'type', 'deleted_at', 'created_at', 'updated_at'];

    id = null; //@type number
    firstname = null; //@type string
    lastname = null; //@type string
    email = null; //@type string
    password = null; //@type null
    email_verified_at = null; //@type date
    type = null; //@type string
    deleted_at = null; //@type date
    created_at = null; //@type date
    updated_at = null; //@type date


}