import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loginUser} from './actions';

import Loader from '../../components/Loader';

import { LOGIN_USER } from '../Login/constants';

require('../../../scss/login.scss');

class Login extends Component {

    render() {
        const { isLoading, loaderType } = this.props.loader;
        return (<div className="login__btn-cntnr">
            { !isLoading || loaderType != LOGIN_USER ? 
                <button 
                    className="login__btn" 
                    onClick={() => this.props.loginUser()}>
                        Login With Facebook
                </button> : <div><Loader /></div> }
          </div>);
    }

}

function mapStateToProps(state) {
    return {
        login: state.login,
        loader: state.loader,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({loginUser: loginUser}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
