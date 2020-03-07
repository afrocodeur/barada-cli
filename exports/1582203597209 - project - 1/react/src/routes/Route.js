import React, { Component } from 'react';
import { Route as ReactRouterRoute, Redirect, withRouter } from 'react-router-dom';

import middlewares from 'app/middlewares';

export default class Route extends Component {

    render() {
        let {path, component: Component, middleware: Middlewares, ...rest} = this.props;
        let bindroute = true, redirectTo = null, component = null, reloadble = /:([a-z0-9_]+)/ig.test(path);

        if (Middlewares) {
            if (typeof Middlewares === 'string') {
                Middlewares = Middlewares.replace(/\s/g, '').split(',');
            }

            for (let middleware of Middlewares) {
                if (middlewares[middleware]) {
                    middleware = middlewares[middleware];
                    bindroute = middleware.run();
                    if (!bindroute) {
                        redirectTo = middleware.redirect ? middleware.redirect() : null;
                        component = middleware.component ? middleware.component() : null;
                        break
                    }
                }
            }
        }

        component = reloadble ? withRouter(component) :  component;

        return (bindroute) ? <ReactRouterRoute {...rest} render={props => (<Component {...props}/>)}/>
            : (component ? <ReactRouterRoute {...rest} render={ component }/> : <Redirect to={redirectTo || '/'}/>);
    }
}