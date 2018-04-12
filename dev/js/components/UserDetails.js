import React, {Component} from 'react';

require('../../scss/user-details.scss');

export default class UserDetails extends Component {

    render() {
      const { displayName, email, photoUrl } = this.props.userDetails;
      return (<div className="usr__cntnr clearfix">
          <img src={photoUrl} className="usr__img" />
          <div className="usr__dtls">
            <div className="usr__name">{displayName}</div>
            <div className="usr__email">{email}</div>
          </div>
        </div>);
    }

}
