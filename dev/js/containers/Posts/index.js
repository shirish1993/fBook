import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPosts, createNewPost } from './actions'

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
    }
    render() {
        const { posts } = this.props.posts;

        return (<div>
            <div>
                <textarea ref={(elem) => {this.postTextArea=elem} }></textarea>
                <button onClick={() => this.newPost()}>create new post</button>
            </div>
            <div>{posts.map(function(elem, index) {
                return <div key={"post-" + index}>{elem.content}<Comments resourceId={elem.uniqueId} /></div>;
            })
        }</div></div>);
    }

}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        login: state.login
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ 
        fetchPosts: fetchPosts,
        createNewPost: createNewPost 
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Posts);