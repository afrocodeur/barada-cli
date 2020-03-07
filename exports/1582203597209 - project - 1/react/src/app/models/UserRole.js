import mobx, { action, observable, runInAction, computed, decorate as decoration } from 'mobx';
import {default as BaradaUserRole} from 'barada/models/UserRole';
import {decorate} from 'barada/helpers/Model';
import User from 'app/models/User';
import Role from 'app/models/Role';

class UserRole extends BaradaUserRole {

    // $json = ['id', 'user_id', 'role_id', 'deleted_at', 'created_at', 'updated_at']

    id=null; // @type number
    user=null; //@type User
    user_id=null; // @type number
    role=null; //@type Role
    role_id=null; // @type number
    deleted_at=null; // @type date
    created_at=null; // @type date
    updated_at=null; // @type date

    $casts = {
        user: (object) => (new User(object)),
        role: (object) => (new Role(object)),
    };

}

decorate(UserRole, {
    id: observable,
    user: observable,
    user_id: observable,
    role: observable,
    role_id: observable,
    deleted_at: observable,
    created_at: observable,
    updated_at: observable,
});

export default UserRole