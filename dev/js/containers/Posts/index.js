import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchPosts, createNewPost } from './actions';
import { setSessionTimer } from '../Session/actions';

import Comments from '../Comments/Loadable';

class Posts extends Component {
    constructor(props) {
        super(props);

        this.newPost = this.newPost.bind(this);
    }

    newPost() {
        this.props.createNewPost(this.postTextArea.value, this.props.login.userDetails, this.props.posts.currentTime);
    }

    componentDidMount() {
        this.props.fetchPosts(this.props.posts.currentTime);

        // call forceUpdate every 1 minute
        // to update time elapsed
        if(!this.props.session.sessionTimer) {
            let sessionTimer = setInterval(() => {
                this.props.setSessionTimer(this.props.session.sessionTimer);
            }, 60000);
            this.props.setSessionTimer(sessionTimer);
        }

    }
    render() {
        const { posts } = this.props.posts;

        let timeElapsed = null;
        return (<div>
            <div>
                <textarea ref={(elem) => {this.postTextArea=elem} }></textarea>
                <button onClick={() => this.newPost()}>create new post</button>
            </div>
            <div>{posts.map(function(elem, index) {
                timeElapsed = moment(elem.postTime);
                return <div key={"post-" + index}>{elem.content}<span>{timeElapsed.fromNow()}</span><Comments resourceId={elem.uniqueId} /></div>;
            })
        }</div></div>);
    }

}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        login: state.login,
        session: state.session,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ 
        fetchPosts: fetchPosts,
        createNewPost: createNewPost,
        setSessionTimer: setSessionTimer,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Posts);