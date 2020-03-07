JSON.overlay = function(o1, o2){
    const keys = Object.keys(o2);
    for(let key in o1) {
        if(keys.indexOf(key) < 0) continue;
        if(typeof o1[key] === 'object' && typeof o2[key] === 'object'){
            o1[key] = JSON.overlay(o1[key], o2[key]);
        }else{
            o1[key] = o2[key];
        }
    }
    return o1;
};