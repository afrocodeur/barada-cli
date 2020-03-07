import React, { Component } from 'react';

import {Provider} from 'mobx-react';
import stores from 'app/stores';
import {BrowserRouter} from 'react-router-dom';
import Routing from 'routes/Routing';


export default class App extends Component {




    render () {
        return <Provider {...stores} >
            <BrowserRouter basename = '' >
                <Routing />
            </BrowserRouter>
        </Provider>
    }
}