import { observable, computed, action } from 'mobx';
import {decorate, PasswordResetStore as BaradaPasswordResetStore} from 'barada/stores/PasswordResetStore';

class PasswordResetStore extends BaradaPasswordResetStore {

    $resource = 'password-reset';


}

//decorate extends of mobx native decorate
decorate(PasswordResetStore, {

});

export default PasswordResetStore;