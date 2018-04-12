import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchPosts, createNewPost } from './actions';
import { setSessionTimer } from '../Session/actions';
import { setUser } from '../Login/actions';

import UserDetails from '../../components/UserDetails';
import PostItem from '../../components/PostItem';

import Loader from '../../components/Loader';

import { FETCH_POSTS, CREATE_NEW_POST } from './constants';

require('../../../scss/posts.scss');

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
        const { posts } = this.props.posts,
            { isLoading, loaderType } = this.props.loader;

        let timeElapsed = null;
        return (<div className="posts__cntnr clearfix">
            <UserDetails 
                userDetails={this.props.login.userDetails} />
            <button className="lgt__btn" onClick={() => this.props.setUser(null)}>Logout</button>
            <div className="posts__new-cntnr">
                <textarea placeholder="Whats up!" className="posts__new-inpt" ref={(elem) => {this.postTextArea=elem} }></textarea>
                <button 
                    className={"posts__new-btn " +  ((!isLoading || loaderType != CREATE_NEW_POST) ? "" : "posts__new-btn-ldng") }
                    onClick={() => (!isLoading || loaderType != CREATE_NEW_POST) ? this.newPost() : null}>
                    { (!isLoading || loaderType != CREATE_NEW_POST) ? "Post" : "Loading" }
                </button>
            </div>
            <div>{ !isLoading || loaderType != FETCH_POSTS ? posts.map(function(elem, index) {
                timeElapsed = moment(elem.postTime);
                return <PostItem
                        key={"post-" + index}
                        timeElapsed={timeElapsed.fromNow()}
                        postDetails={elem} />;
            }) : <div><Loader /></div>
        }</div></div>);
    }

}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        login: state.login,
        session: state.session,
        loader: state.loader,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ 
        fetchPosts: fetchPosts,
        createNewPost: createNewPost,
        setSessionTimer: setSessionTimer,
        setUser: setUser,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Posts);