import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchComments, createNewComment, changeCommentText } from './actions'

class Comments extends Component {
    constructor(props) {
        super(props);

        this.renderComments = this.renderComments.bind(this);
    }

    renderComments() {
        const { comments, commentText } = this.props.comments,
            resourceId = this.props.resourceId,
            currentTime = new Date();

        let timeElapsed = null;
        return (<div><ul>
            {comments[resourceId].map(function(elem, index) {
                timeElapsed = moment(elem.postTime);
                return <li key={"comment-" + elem.uniqueId}>{elem.content}<span>{timeElapsed.fromNow()}</span></li>
            })}
        </ul>
        <textarea 
            onChange={(e) => this.props.changeCommentText(e.target.value, resourceId)} value={commentText[resourceId] ? commentText[resourceId] : ""}></textarea>
        <button onClick={() => this.props.createNewComment(resourceId, commentText[resourceId] ? commentText[resourceId] : "", this.props.login.userDetails, currentTime.getTime())}>post comment</button>
        </div>);
    }

    render() {
        const { comments, commentText } = this.props.comments,
            resourceId = this.props.resourceId,
            currentTime = new Date();

        return (comments[resourceId] ? <div>{this.renderComments()}</div> : <button onClick={() => this.props.fetchComments(resourceId, currentTime.getTime())}>load comments</button>);
    }

}

function mapStateToProps(state) {
    return {
        comments: state.comments,
        login: state.login,
        session: state.session,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ 
        fetchComments: fetchComments,
        createNewComment: createNewComment,
        changeCommentText: changeCommentText
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Comments);