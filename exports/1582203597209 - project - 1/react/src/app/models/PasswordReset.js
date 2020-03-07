import mobx, { action, observable, runInAction, computed, decorate as decoration } from 'mobx';
import {default as BaradaPasswordReset} from 'barada/models/PasswordReset';
import {decorate} from 'barada/helpers/Model';

class PasswordReset extends BaradaPasswordReset {

    // $json = ['id', 'email', 'token', 'deleted_at', 'created_at', 'updated_at']

    id=null; // @type number
    email=null; // @type string
    token=null; // @type string
    deleted_at=null; // @type date
    created_at=null; // @type date
    updated_at=null; // @type date

    $casts = {
    };

}

decorate(PasswordReset, {
    id: observable,
    email: observable,
    token: observable,
    deleted_at: observable,
    created_at: observable,
    updated_at: observable,
});

export default PasswordReset