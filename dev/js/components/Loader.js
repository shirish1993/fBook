import React, {Component} from 'react';

require('../../scss/loader.scss');

export default class Loader extends Component {

    render() {
      return (<div className="ldr__ring-cntnr"><div className="ldr__ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div></div>);
    }

}
