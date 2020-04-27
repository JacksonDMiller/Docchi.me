import React, { Component } from 'react'
import { createAccount } from '../Store/Actions/AuthActions'
import { createAccountWithGoogle } from '../Store/Actions/AuthActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class CreateAccount extends Component {
    state = {
        email: '',
        password: '',
        userName: '',
        age: '',
        gender: '',
    }


    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        event.preventDefault();
        this.props.createAccount(this.state);
    };

    googleCreateAccount = event => {
        this.props.createAccountWithGoogle();
    }

    render() {
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to='/' />
        return (
            <div className="container">
                <button onClick={this.googleCreateAccount}>sign in with google</button>
                <form onSubmit={this.onSubmit} action="" className="">
                    <input
                        name="email"
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        name="userName"
                        onChange={this.onChange}
                        type="text"
                        placeholder="User Name"
                    />
                    <input
                        name="password"
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        name="age"
                        onChange={this.onChange}
                        type="text"
                        placeholder="Age"
                    />

                    <p>
                        <label>
                            <input
                                onChange={this.onChange}
                                type="radio"
                                name="gender"
                                value="Male"
                                className="form-check-input"
                            />
                            <span>Male</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input
                                onChange={this.onChange}
                                type="radio"
                                name="gender"
                                value="Female"
                                className="form-check-input"
                            />
                            <span>Female</span>
                        </label>
                    </p>
                    <button className="btn" type="submit" name="action">Create Account</button>
                </form>
                <div className="center red-text">
                    {authError ? <p>{authError}</p> : null}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createAccount: (creds) => dispatch(createAccount(creds)),
        createAccountWithGoogle: () => dispatch(createAccountWithGoogle())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)