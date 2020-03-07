import React, {Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';



class Trans extends Component{

    render() {
        const { t, id, path, params } = this.props;
        const key = id || path || this.props.children;

        return <Fragment>{t(key, params)}</Fragment>;
    }
}

export default withTranslation()(Trans);