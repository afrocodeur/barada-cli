import { observable, computed, action } from 'mobx';
import {decorate, CommandStore as BaradaCommandStore} from 'barada/stores/CommandStore';

class CommandStore extends BaradaCommandStore {

    $resource = 'command';


}

//decorate extends of mobx native decorate
decorate(CommandStore, {

});

export default CommandStore;