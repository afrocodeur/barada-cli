import Auth from './Auth'
import middlewares from 'barada/middlewares'

export default {
    ...middlewares,
    auth: Auth
}