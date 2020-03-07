import mobx, { action, observable, runInAction, computed, decorate as decoration } from 'mobx';
import {default as BaradaUser} from 'barada/models/User';
import {decorate} from 'barada/helpers/Model';

class User extends BaradaUser {

    // $json = ['id', 'firstname', 'lastname', 'email', 'password', 'email_verified_at', 'type', 'deleted_at', 'created_at', 'updated_at']

    id=null; // @type number
    firstname=null; // @type string
    lastname=null; // @type string
    email=null; // @type string
    password=null; // @type null
    email_verified_at=null; // @type date
    type=null; // @type string
    deleted_at=null; // @type date
    created_at=null; // @type date
    updated_at=null; // @type date

    $casts = {
    };

}

decorate(User, {
    id: observable,
    firstname: observable,
    lastname: observable,
    email: observable,
    password: observable,
    email_verified_at: observable,
    type: observable,
    deleted_at: observable,
    created_at: observable,
    updated_at: observable,
});

export default User