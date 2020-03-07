import React from 'react';
import ReactDOM from 'react-dom';

import App from 'app/App';
import * as serviceWorker from './serviceWorker';

import { configure } from 'mobx';
import { Provider as MobxProvider } from 'mobx-react';
import stores from 'app/stores';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import i18n from './i18n';

//import global css
import './index.css';

configure({ enforceActions: 'always' });



const root = document.getElementById('root');

ReactDOM.render(<MobxProvider {...stores} ><I18nextProvider i18n={i18n}><App /></I18nextProvider></MobxProvider>, root);

/*
    If you want your app to work offline and load faster, you can change
    unregister() to register() below. Note this comes with some pitfalls.
    Learn more about service workers: https://bit.ly/CRA-PWA
*/
serviceWorker.unregister();

if(module.hot) {
    module.hot.accept('./app/App', () => {
        const NextApp = require('./app/App').default;
        ReactDOM.render(<NextApp />, root);
    })
}
