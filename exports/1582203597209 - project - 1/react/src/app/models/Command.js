import mobx, { action, observable, runInAction, computed, decorate as decoration } from 'mobx';
import {default as BaradaCommand} from 'barada/models/Command';
import {decorate} from 'barada/helpers/Model';
import User from 'app/models/User';

class Command extends BaradaCommand {

    // $json = ['id', 'name', 'description', 'user_id', 'deleted_at', 'created_at', 'updated_at']

    id=null; // @type number
    name=null; // @type string
    description=null; // @type string
    user=null; //@type User
    user_id=null; // @type number
    deleted_at=null; // @type date
    created_at=null; // @type date
    updated_at=null; // @type date

    $casts = {
        user: (object) => (new User(object)),
    };

}

decorate(Command, {
    id: observable,
    name: observable,
    description: observable,
    user: observable,
    user_id: observable,
    deleted_at: observable,
    created_at: observable,
    updated_at: observable,
});

export default Command