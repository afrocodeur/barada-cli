import React from 'react'

var routes = []
var routesNamed = null


class Router {
    details = {name: '', path: '', component: null, middleware: [], group: {}}
    parent = null
    isGroupe = false

    name(name) {
        if(name) this.details.name = name
        else {
            name = (this.parent) ? this.parent.name() : ''
            return (name ? name+'.' : '')+this.details.name
        }

        return this;
    }

    path(path) {
        if(path) this.details.path = path
        else {
            path = (this.parent) ? this.parent.path() : ''
            return '/'+(path ? path+'/' : '')+this.details.path
        }
        return this;
    }

    component(component) {
        if(component) this.details.component = component
        else return this.details.component
        return this;
    }

    middleware(middleware) {
        if(middleware) this.details.component = (typeof middleware === 'string' ? middleware.replace(/\s/g, '').split(',') : middleware)
        else {
            middleware = (this.parent) ? this.parent.middleware() : []
            return middleware.concat(this.details.middleware)
        }
        return this;
    }

    descr(descr) {
        this.details.group = descr
        this.details.name = descr.name
        this.details.path = descr.path
        this.details.middleware = descr.middleware
        return this
    }

    add(path, component) {
        let route = (new Router())
        route.parent = this
        route.path(path).component(component)

        console.log('rien a dire')
        routes.push(route)

        return route;
    }

    group(scope) {
        let groupe = new Router()
        groupe.isGroupe = true

        scope.apply(this, [groupe])

        return groupe
    }

    build() {
        routesNamed = {}
        routes.forEach(route => {
            if(!route.isGroupe) {
                routesNamed[route.name()] = route
            }
        });
    }
    routes() {
        this.build()
        return Object.values(routesNamed)
    }

    names() { this.build(); Object.keys(routesNamed)}

    route(name, params) {
        return ''
    }
}



export default new Router
