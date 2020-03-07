import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import {NotFound} from 'app/pages/errors';
import {Home} from 'app/pages/statics';

import Route from './Route';
import Router from 'barada/helpers/Router';

// Import your routes files
import './Barada';

export default class Routing extends Component {

    render() {
        return <Switch>
            {
                Router.routes().map((route, index) => (<Route key = {index} exact path={route.path()} component = {route.component()} />))
            }
            <Route path="/" exact component = {Home} />
            <Route path="*" exact component = {NotFound} />
        </Switch>
    }
}
