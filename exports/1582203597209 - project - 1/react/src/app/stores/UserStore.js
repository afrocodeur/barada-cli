import { observable, computed, action } from 'mobx';
import {decorate, UserStore as BaradaUserStore} from 'barada/stores/UserStore';

class UserStore extends BaradaUserStore {

    $resource = 'user';


}

//decorate extends of mobx native decorate
decorate(UserStore, {

});

export default UserStore;