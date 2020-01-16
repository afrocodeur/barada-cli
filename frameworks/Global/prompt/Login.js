module.exports = [
    {
        name : 'email',
        message : 'Email',
        validate : function(value){
            return (/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(value);
        }
    },
    {
        name : 'password',
        type : 'password',
        message : 'Password'
    }
];
