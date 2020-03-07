import { observable, computed, action } from 'mobx';
import {decorate, RoleStore as BaradaRoleStore} from 'barada/stores/RoleStore';

class RoleStore extends BaradaRoleStore {

    $resource = 'role';


}

//decorate extends of mobx native decorate
decorate(RoleStore, {

});

export default RoleStore;