JSON.clone = function(object) {
    return JSON.parse(JSON.stringify(object));
};

JSON.merge = function(destination, source){
    for(let key in source){
        if(destination){
            if(typeof destination[key] === 'object')
                JSON.merge(destination[key], source[key]);
            else destination[key] = source[key];
        }
    }
    return destination;
};
