import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loginUser} from './actions'

class UserList extends Component {

    render() {
        return <div onClick={() => this.props.loginUser()}>login via fb</div>;
    }

}

function mapStateToProps(state) {
    return {
        login: state.login
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({loginUser: loginUser}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(UserList);
