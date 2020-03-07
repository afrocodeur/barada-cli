import mobx, { action, observable, runInAction, computed, decorate as decoration } from 'mobx';
import {default as BaradaRole} from 'barada/models/Role';
import {decorate} from 'barada/helpers/Model';

class Role extends BaradaRole {

    // $json = ['id', 'title', 'description', 'deleted_at', 'created_at', 'updated_at']

    id=null; // @type number
    title=null; // @type string
    description=null; // @type string
    deleted_at=null; // @type date
    created_at=null; // @type date
    updated_at=null; // @type date

    $casts = {
    };

}

decorate(Role, {
    id: observable,
    title: observable,
    description: observable,
    deleted_at: observable,
    created_at: observable,
    updated_at: observable,
});

export default Role