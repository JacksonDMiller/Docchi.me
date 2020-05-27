import React, { Component } from 'react'
import { signOut } from '../Store/Actions/AuthActions'
import { connect } from 'react-redux'

class SignOut extends Component {

    signOut = event => {
        this.props.signOut();
    };

    render() {
        
        return (
            <button onClick={this.signOut} type="Submit">LogOut</button>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: (creds) => dispatch(signOut(creds))
    }
}

export default connect(null, mapDispatchToProps)(SignOut)