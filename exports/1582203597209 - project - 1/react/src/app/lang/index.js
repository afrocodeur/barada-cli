import 'barada/helpers/Json';

//Import en files
import barada_auth_en from 'barada/lang/en/auth.json';
import auth_en from './en/auth.json';



//Import fr files
import barada_auth_fr from 'barada/lang/fr/auth.json';
import auth_fr from './fr/auth.json';



//Import es files
import barada_auth_es from 'barada/lang/es/auth.json';
import auth_es from './es/auth.json';





export default {
    'en': {
        translation: {
            'auth': JSON.overlay(barada_auth_en, auth_en)
        },
    },
    'fr': {
        translation: {
            'auth': JSON.overlay(barada_auth_fr, auth_fr)
        },
    },
    'es': {
        translation: {
            'auth': JSON.overlay(barada_auth_es, auth_es)
        },
    },
}