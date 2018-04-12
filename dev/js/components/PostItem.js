import React, {Component} from 'react';
import Comments from '../containers/Comments';

require('../../scss/post-item.scss');

export default class PostItem extends Component {

    render() {
      const { content, displayName, email, photoUrl, uniqueId } = this.props.postDetails;
      return (<div className="post__cntnr-item">
          <div className="post__usr-dtls clearfix">
            <img src={photoUrl} className="post__usr-img" />
            <div className="post__usr-rght">
              <div className="post__usr-name">
                {displayName}
              </div>
              <div className="post__usr-time">
                {this.props.timeElapsed}
              </div>
            </div>
          </div>
          <div className="post__cntnt">
            {content}
          </div>
          <Comments resourceId={uniqueId} />
        </div>);
    }

}
