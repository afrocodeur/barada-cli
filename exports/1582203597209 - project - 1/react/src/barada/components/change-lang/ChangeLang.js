import React, {Component} from "react";
import languages from 'app/lang/list';
import i18n from 'i18next';


export default class ChangeLang extends Component{

    changeLangTo = (short) => {
        i18n.changeLanguage(short)
    };

    render() {
        return <div>
            {
                languages.map((lang, index) => (<button key={index} onClick={()=>(this.changeLangTo(lang.short))}>{lang.name}</button>))
            }
        </div>;
    }
}