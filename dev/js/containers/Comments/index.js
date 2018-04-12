import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import CommentItem from '../../components/CommentItem';
import Loader from '../../components/Loader';

import { FETCH_COMMENTS, CREATE_NEW_COMMENT } from './constants';

require('../../../scss/comments.scss');

import { fetchComments, createNewComment, changeCommentText } from './actions'

class Comments extends Component {
    constructor(props) {
        super(props);

        this.renderComments = this.renderComments.bind(this);
    }

    renderComments() {
        const { comments, commentText } = this.props.comments,
            resourceId = this.props.resourceId,
            currentTime = new Date(),
            { isLoading, loaderType } = this.props.loader;

        let timeElapsed = null;
        return (<div><ul>
            {comments[resourceId].map(function(elem, index) {
                timeElapsed = moment(elem.postTime);
                return <CommentItem
                            key={"comment-" + elem.uniqueId}
                            commentDetails={elem}
                            timeElapsed={timeElapsed.fromNow()} />;
            })}
        </ul>
        <div className="cmnts__new-cntnr">
            <img src={this.props.login.userDetails.photoUrl} className="cmnts__new-img" />
            <textarea 
                className="cmnts__new-inpt"
                placeholder="What's your thought?"
                onChange={(e) => this.props.changeCommentText(e.target.value, resourceId)} 
                value={commentText[resourceId] ? commentText[resourceId] : ""}>
            </textarea>
            <button 
                className={"cmnts__new-btn" + ((!isLoading || loaderType != CREATE_NEW_COMMENT+resourceId) ? "" : " cmnts__new-btn-ldng")}
                onClick={() => (!isLoading || loaderType != CREATE_NEW_COMMENT+resourceId) ? this.props.createNewComment(resourceId, commentText[resourceId] ? commentText[resourceId] : "", this.props.login.userDetails, currentTime.getTime()) : null}>
                Comment
            </button>
        </div>
        </div>);
    }

    render() {
        const { comments, commentText } = this.props.comments,
            resourceId = this.props.resourceId,
            currentTime = new Date(),
            { isLoading, loaderType } = this.props.loader;

        return (comments[resourceId] ? 
            this.renderComments() : 
            ( !isLoading || loaderType != (FETCH_COMMENTS + resourceId) ? <button 
                className="cmnts__load-btn" 
                onClick={() => this.props.fetchComments(resourceId, currentTime.getTime())}>Show Comments
            </button> : <Loader size="small" />));
    }

}

function mapStateToProps(state) {
    return {
        comments: state.comments,
        login: state.login,
        session: state.session,
        loader: state.loader,
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