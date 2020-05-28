import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../Store/Actions/AuthActions'
import M from 'materialize-css/dist/js/materialize.min.js';
import { createAccountWithGoogle } from '../Store/Actions/AuthActions'


class Navbar extends Component {


    componentDidMount() {
        let sidenav = document.querySelector('.sidenav');
        M.Sidenav.init(sidenav, { closeOnClick: true });
    }

    render() {

        return (
            <div>
                <nav>
                    <div className="nav-wrapper yuiBlue">
                        <a href="/" className="brand-logo center">Docchi</a>
                        <a href="#!" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        {!this.props.auth.uid ?
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><Link to='/'>Play</Link></li>
                                <li > <a href='#!' onClick={this.props.createAccountWithGoogle}>My Profile</a></li>
                                <li > <a href='#!' onClick={this.props.createAccountWithGoogle}>Create a Question</a></li>
                                <li>  <Link to='/aboutus'>About Us</Link></li>
                                <li>  <a href='#!' onClick={this.props.createAccountWithGoogle}>Sign in</a></li>

                            </ul> :
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li> <Link to='/'>Play</Link></li>
                                <li> <Link to='/profile'>My Profile</Link></li>
                                <li>  <Link to='/createquestion'>Create Question</Link></li>
                                <li>  <Link to='/aboutus'>About Us</Link></li>
                                <li>  <a href='/' onClick={this.props.signOut}>Log Out</a></li>
                            </ul>}
                    </div>
                </nav>

                <ul id="slide-out" className="sidenav">
                    {!this.props.auth.uid ?
                        <ul>
                            <li className="sidenav-close yuiBlue"> <Link className='white-text' to='/'>Docchi</Link></li>
                            <li className="sidenav-close"><Link to='/'>Play</Link></li>
                            <li className="sidenav-close"> <a href='#!' onClick={this.props.createAccountWithGoogle}>My Profile</a></li>
                            <li className="sidenav-close"> <a href='#!' onClick={this.props.createAccountWithGoogle}>Create a Question</a></li>
                            <li className="sidenav-close"> <Link to='/aboutus'>About Us</Link></li>
                            <li className="sidenav-close">  <a href='#!' onClick={this.props.createAccountWithGoogle}>Sign in</a></li>



                        </ul> :
                        <ul>
                            <li className="sidenav-close yuiBlue"> <Link className='white-text' to='/'>Docchi</Link></li>
                            <li className="sidenav-close"><Link to='/'>Play</Link></li>
                            <li className="sidenav-close"> <Link to='/profile'>My Profile</Link></li>
                            <li className="sidenav-close"> <Link to='/createquestion'>Create a Question</Link></li>
                            <li className="sidenav-close"> <Link to='/aboutus'>About Us</Link></li>
                            <li className="sidenav-close"> <a href='/' onClick={this.props.signOut}>Log Out</a></li>
                        </ul>}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: (creds) => dispatch(signOut(creds)),
        createAccountWithGoogle: () => dispatch(createAccountWithGoogle())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
