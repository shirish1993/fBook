import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loginUser} from './actions';

require('../../../scss/login.scss');

class Login extends Component {

    render() {
        return (<div className="login__btn-cntnr">
            <button className="login__btn" onClick={() => this.props.loginUser()}>Login With Facebook</button>
          </div>);
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

export default connect(mapStateToProps, matchDispatchToProps)(Login);
