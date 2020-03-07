import mobx, { action, observable, runInAction, computed} from 'mobx';
import {AppStore as BaradaAppStore, decorate} from 'barada/stores/AppStore';

class AppStore extends BaradaAppStore{

}

decorate(AppStore, {

});

export default AppStore;