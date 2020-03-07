import axios from 'axios';

const auth_token = process.env.REACT_APP_AUTH_TOKEN_KEY;

let Interceptors = {};

function handleInterceptor(code, response, error){
    if(Interceptors[code]){
        Interceptors[code].forEach((callback) => (callback.apply(this, [response, error])));
    }
}

const Api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*'
    }
});

Api.auth = (token, save) => {
    Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    if(save) {
        localStorage.setItem(auth_token, token)
    }
};

Api.interceptors.response.use(null, async function (error) {
    let response = {}
    if(error.response){
        try {
            response = JSON.parse(error.response.request.responseText)
        } catch (e) {
            response = error.response.request.responseText
        }
    }

    handleInterceptor('all', response, error);
    handleInterceptor(error.response.status, response, error);

    return Promise.reject(response)
});

Api.on = (code, callback) => {
    if(!Interceptors[code]) Interceptors[code] = [];
    Interceptors[code].push(callback);
};

const Token = localStorage.getItem(auth_token);


export {Api, Token}