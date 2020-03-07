import axios from 'axios';
import {Api, Token} from 'barada/helpers/Api';
const auth_token = process.env.REACT_APP_AUTH_TOKEN_KEY;


Api.on('all', (response, error) => {
    // Todo: do something
});

Api.on(401, (response, error) => {
    // Unauthorized
    // Clean the storage
    // localStorage.removeItem(auth_token);
    // redirect user to home or other page
    // etc..
});



export {Api, Token};