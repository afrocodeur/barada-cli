import { observable, computed, action } from 'mobx';
import {decorate, UserRoleStore as BaradaUserRoleStore} from 'barada/stores/UserRoleStore';

class UserRoleStore extends BaradaUserRoleStore {

    $resource = 'user-role';


}

//decorate extends of mobx native decorate
decorate(UserRoleStore, {

});

export default UserRoleStore;