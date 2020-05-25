import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, getFirebase } from 'react-redux-firebase'
import { compose } from 'redux'
import M from 'materialize-css/dist/js/materialize.min.js';
import { approveQuestion, rejectQuestion } from '../Store/Actions/QuestionActions'
import { Redirect } from 'react-router-dom'



class Approver extends Component {




    onSubmit = event => {
        event.preventDefault();

    };

    approve = event => {
        console.log(event)
        this.props.approveQuestion(event)
    }

    reject = event => {
        console.log(event)
        this.props.rejectQuestion(event)
    }

    handleClick = event => {

    }


    render() {
        const { profile, questions } = this.props
        console.log(questions)
        const { auth, authError } = this.props;
        if (auth.uid != 'jC5mtZZ4drfVoFQf7yjUNSp4bf03') return <Redirect to='/' />




        if (questions) {
            this.sub = questions.map((value, index) => {
                if (questions[index].status === "Pending") {

                    return <li key={index} className="collection-item avatar">
                        <i className="material-icons circle">change_history</i>
                        <span className="title">Would you rather...</span>
                        <p>{questions[index].answerOne} or {questions[index].answerTwo}</p>
                        {questions[index].status === 'Pending' ? <p className='red-text'>Pending</p> : <p className='green-text'>Approved</p>}
                        <button onClick={() => this.approve(questions[index].id)}>Approve</button>
                        <button onClick={() => this.reject(questions[index].id)}>Reject</button>

                    </li>
                }
            })
        }


        return (

            <div id="Submissions" className="col s12" >
                <div className=''>
                    {this.sub === undefined || this.sub.length === 0 ? <span>Nothing here yet. Submit a question.</span> : <ul className="collection left-align">{this.sub}</ul>}
                </div>
            </div>


        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        questions: state.firestore.ordered.questions,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        approveQuestion: (details) => dispatch(approveQuestion(details)),
        rejectQuestion: (details) => dispatch(rejectQuestion(details)),
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'questions' },
    ])
)(Approver)