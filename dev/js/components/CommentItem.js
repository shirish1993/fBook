import React, {Component} from 'react';
import Comments from '../containers/Comments';

require('../../scss/comment-item.scss');

export default class CommentItem extends Component {

    render() {
      const { content, displayName, email, photoUrl, uniqueId } = this.props.commentDetails;
      return (<div className="cmnt__cntnr-item">
          <div className="cmnt__usr-dtls clearfix">
            <img src={photoUrl} className="cmnt__usr-img" />
            <div className="cmnt__usr-rght">
              <div className="cmnt__usr-name">
                {displayName}
              </div>
              <div className="cmnt__usr-time">
                {this.props.timeElapsed}
              </div>
            </div>
          </div>
          <div className="cmnt__cntnt">
            {content}
          </div>
        </div>);
    }

}
