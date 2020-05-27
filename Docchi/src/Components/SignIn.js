//deporcated

// import React, { Component } from 'react'
// import { signIn } from '../Store/Actions/AuthActions'
// import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'


// class SignIn extends Component {
//     state = {
//         email: '',
//         password: '',
//     }

//     onChange = event => {
//         this.setState({ [event.target.name]: event.target.value });
//     };

//     onSubmit = event => {
//         event.preventDefault();
//         this.props.signIn(this.state);
//     };

//     render() {
//         const { auth } = this.props;
//         if (auth.uid) return <Redirect to='/' />
//         return (
//             <div className='container'>
//                 <h1>Sign In</h1>
//                 <form onSubmit={this.onSubmit}>
//                     <input
//                         name="email"
//                         onChange={this.onChange}
//                         type="text"
//                         placeholder="Email Address"
//                     />
//                     <input
//                         name="password"
//                         onChange={this.onChange}
//                         type="password"
//                         placeholder="Password"
//                     />
//                     <button className='btn' type="submit">Sign In</button>
//                 </form>
//             </div>
//         )
//     }
// }


// const mapStateToProps = (state) => {
//     return {
//         auth: state.firebase.auth,
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         signIn: (creds) => dispatch(signIn(creds))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SignIn)