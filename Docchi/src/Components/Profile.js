import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, getFirebase } from 'react-redux-firebase'
import { compose } from 'redux'
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateAccount } from '../Store/Actions/AuthActions'



class Profile extends Component {

    state = {
        gender: '',
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        event.preventDefault();
        this.props.updateAccount(this.state);
    };

    componentDidMount() {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, null);
    }

    handleClick = event => {
        var invoiceToSend = document.querySelectorAll('.textArea')[0].value
        const payInvoice = getFirebase().functions().httpsCallable('payInvoice')

        payInvoice({ invoice: invoiceToSend }).then((result) => {
            M.toast({ html: result.data.message });
        })
    }

    render() {
        const { profile, questions } = this.props
        if (profile.submissions) {
            this.sub = profile.submissions.map((item, key) => {
                if (questions[item]) {
                    return (<li key={item}>
                        <p className='col s4 card-panel teal lighten-2'>{questions[item].questionOne} </p>
                        <p className='col s4 card-panel teal lighten-2' >{questions[item].questionTwo}</p>
                        <p className='col s4 card-panel teal lighten-2'>{questions[item].status ? questions[item].status : 'Pending...'}</p>
                    </li>)
                }
                else { return (null) }
            }
            );
        }
        return (
            <div>
                <div className='container'>
                    <h1>{profile.userName}</h1>
                    {profile.gender === '' ?
                        <form onSubmit={this.onSubmit} action="" className="">
                            <h4>Please select your gender to continue.</h4>
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
                            <button className="btn" type="submit" name="action">Submit</button>
                        </form>

                        : <h6>Gender: {profile.gender}</h6>}

                    <h6> Sats Earned: {profile.sats} </h6>
                    <button data-target="modal1" className="btn modal-trigger">Withdraw</button>
                    <h4>Achievements</h4>


                    {profile.isEmpty === false ?
                        <ul className="row">
                            <li>
                                <p className='col s9 m8 card-panel teal lighten-2'>Answer your first question</p>
                                <p className='col s2 card-panel teal lighten-2 hide-on-small-only'>100 sats</p>
                                {profile.achievements.includes('Answer your first question') ? <p className='col s3 m2 card-panel teal lighten-2'> Complete</p> : <p className='col s3 m2 card-panel teal lighten-2'> Incomplete</p>}

                            </li>
                            <li>
                                <p className='col s9 m8 card-panel teal lighten-2'>Submit your first question</p>
                                <p className='col s2 card-panel teal lighten-2 hide-on-small-only'>100 sats</p>
                                {profile.achievements.includes('Submit your first question') ? <p className='col s3 m2 card-panel teal lighten-2'> Complete</p> : <p className='col s3 m2 card-panel teal lighten-2'> Incomplete</p>}
                            </li>
                            <li>
                                <p className='col s9 m8 card-panel teal lighten-2'>Renegade: Disagree with the majority 5 times</p>
                                <p className='col s2 card-panel teal lighten-2 hide-on-small-only'>100 sats</p>
                                {profile.achievements.includes('Renegade: Answer 5 questions against the majority') ? <p className='col s3 m2 card-panel teal lighten-2'> Complete</p> : <p className='col s3 m2 card-panel teal lighten-2'>Incomplete</p>}
                            </li>
                            <li>
                                <p className='col s9 m8 card-panel teal lighten-2'>Conformist: Agree with the majority 5 times</p>
                                <p className='col s2 card-panel teal lighten-2 hide-on-small-only'>100 sats</p>
                                {profile.achievements.includes('Conformist: Answer 5 questions in agreement with the majority') ? <p className='col s3 m2 card-panel teal lighten-2'> Complete</p> : <p className='col s3 m2 card-panel teal lighten-2'> Incomplete</p>}
                            </li>
                        </ul>
                        : <h4>loading...</h4>}
                    <h4>Pending Submissions</h4>
                    {this.sub === undefined || this.sub.length === 0 ? <span>Nothing here yet. Submit a question.</span> : <ul className="row">{this.sub}</ul>}
                </div>

                {/* Modal */}
                <div id="modal1" className="modal">
                    <form action="">
                        <div className="modal-content">
                            <h4>Please enter a lighting invoice</h4>

                            <textarea className='textArea materialize-textarea'> </textarea>
                        </div>

                        <div className="modal-footer">
                            <a onClick={this.handleClick} href="#!" className="withdrawButton modal-close waves-effect waves-green btn-flat">Withdraw</a>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        questions: state.firestore.data.questions,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAccount: (details) => dispatch(updateAccount(details)),
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'questions' },
    ])
)(Profile)