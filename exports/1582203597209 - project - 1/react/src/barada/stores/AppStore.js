import mobx, { action, observable, runInAction, computed, decorate as decoration } from 'mobx';
class AppStore {

}


const decorations = {

};

function decorate(object, description){
    return decoration(object, Object.assign({}, decorations, description))
}

export { AppStore, decorate };