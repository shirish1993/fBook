import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setToastDetails} from './actions'

class Toast extends Component {

    render() {
        return this.props.toast.message ? (<div onClick={() => this.props.setToastDetails(null, null)}>
            {this.props.toast.message}
        </div>) : null;
    }

}

function mapStateToProps(state) {
    return {
        toast: state.toast
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({setToastDetails: setToastDetails}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Toast);
