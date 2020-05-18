import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, getFirebase } from 'react-redux-firebase'
import { compose } from 'redux'
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateAccount } from '../Store/Actions/AuthActions'




class Profile extends Component {

    state = {
        gender: '',
        invoice: '',
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.updateAccount({ gender: event.target.value });
    };

    onChangeInvoice = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        event.preventDefault();

    };

    componentDidMount() {
        var elems = document.querySelectorAll('.modal');
        var tabElems = document.querySelectorAll('.tabs');
        M.Modal.init(elems, null);
        M.Tabs.init(tabElems, { swipeable: true });
    }

    handleClick = event => {
        const payInvoice = getFirebase().functions().httpsCallable('payInvoice')
        payInvoice({ invoice: this.state.invoice }).then((result) => {
            M.toast({ html: result.data.message });
        })
    }


    render() {


        const { profile, questions } = this.props
        if (profile.submissions) {
            this.sub = profile.submissions.map((item, key) => {
                if (questions[item]) {
                    return (<li key={item} className="collection-item avatar">
                        <i className="material-icons circle">change_history</i>
                        <span className="title">Would you rather...</span>
                        <p>{questions[item].answerOne} or {questions[item].answerTwo}</p>
                        {questions[item].status === 'Pending' ? <p className='red-text'>Pending</p> : <p className='green-text'>Approved</p>}
                    </li>

                    )
                }
                else { return (null) }
            }
            );
        }
        return (
            <div>
                <div className='container'>
                    <div className='yuiLighterBlue row nameTag'>
                        <h2 className='col s12 left-align'>{profile.userName}</h2>
                        {profile.gender === '' ?
                            <form onSubmit={this.onSubmit} action="" className="row">
                                <h6>Please select your gender to continue.</h6>
                                <p className='col s6'>
                                    <label>
                                        <input
                                            onChange={this.onChange}
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            className="form-check-input"
                                        />
                                        <span className='black-text'>Male</span>
                                    </label>
                                </p>
                                <p className='col s6'>
                                    <label>
                                        <input
                                            onChange={this.onChange}
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            className="form-check-input"
                                        />
                                        <span className='black-text'>Female</span>
                                    </label>
                                </p>
                            </form>

                            : <div><h6 className='col s3 left-align grey-text'>Gender:</h6> <h6 className='col s9 left-align'>{profile.gender}</h6></div>}
                        <h6 className='input-field col s3 left-align grey-text'>Sats Earned:</h6><h6 className='input-field col s3 left-align'>{profile.sats} </h6>
                        <button data-target="modal1" className="left-align input-field col s3 indigo darken-3 btn modal-trigger">Withdraw</button>
                    </div>

                    <div className="row">
                        <div className="col s12">
                            <ul className="tabs">
                                <li className="tab col s3"><a className='black-text' href="#Achievements">Achievements</a></li>
                                <li className="tab col s3"><a className="black-text" href="#Submissions">Submissions</a></li>
                            </ul>
                        </div>
                        <div id="Achievements" className="col s12">

                            {profile.isEmpty === false ?
                                <ul className="collection left-align">
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle">change_history</i>
                                        <span className="title">Answer your first question</span>
                                        <p>Earn 300 sats </p>
                                        {profile.achievements.includes('Answer your first question') ? <p className='green-text'>Completed</p> : <p className='red-text'>Incomplete</p>}


                                    </li>
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle">change_history</i>
                                        <span className="title">Submit your first question</span>
                                        <p>Earn 300 sats </p>
                                        {profile.achievements.includes('Submit your first question') ? <p className='green-text'>Completed</p> : <p className='red-text'>Incomplete</p>}
                                    </li>
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle">change_history</i>
                                        <span className="title">Renegade: Answer 5 questions against the majority</span>
                                        <p>Earn 300 sats </p>
                                        {profile.achievements.includes('Renegade: Answer 5 questions against the majority') ? <p className='green-text'>Completed</p> : <p className='red-text'>Incomplete</p>}
                                    </li>
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle">change_history</i>
                                        <span className="title">Conformist: Answer 5 questions in agreement with the majority</span>
                                        <p>Earn 300 sats </p>
                                        {profile.achievements.includes('Conformist: Answer 5 questions in agreement with the majority') ? <p className='green-text'>Completed</p> : <p className='red-text'>Incomplete</p>}
                                    </li>
                                </ul>
                                : <h4>loading...</h4>}

                        </div>
                        <div id="Submissions" className="col s12">
                            <div className=''>
                                {this.sub === undefined || this.sub.length === 0 ? <span>Nothing here yet. Submit a question.</span> : <ul className="collection left-align">{this.sub}</ul>}
                            </div>
                        </div>
                    </div>




                </div>

                {/* Modal */}
                <div id="modal1" className="modal">
                    <form action="">
                        <div className="modal-content input-field">
                            <h4>Please enter a lighting invoice</h4>

                            <textarea onChange={this.onChangeInvoice} defaultValue={this.state.invoice} name="invoice" className='materialize-textarea invoiceInput'></textarea>
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