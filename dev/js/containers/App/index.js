import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Posts from '../Posts/Loadable';
import Login from '../Login/Loadable';

import Toast from '../Toast';

class UserList extends Component {

    render() {
        return (<div>
            <Toast />
            { this.props.login.userDetails ?
            <Posts /> : <Login /> }
        </div>);
    }

}

function mapStateToProps(state) {
    return {
        login: state.login
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(UserList);
