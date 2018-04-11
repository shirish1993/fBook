import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchPosts} from './actions'

class UserList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
    render() {
        return <div>hello world</div>;
    }

}

function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({fetchPosts: fetchPosts}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(UserList);
