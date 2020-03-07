import mobx, { action, observable, runInAction, computed} from 'mobx';
import {AuthStore as BaradaAuthStore, decorate} from 'barada/stores/AuthStore';

class AuthStore extends BaradaAuthStore{

}

decorate(AuthStore, {

});

export default AuthStore;