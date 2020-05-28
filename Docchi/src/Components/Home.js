import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { updateQuestion, newQuestion } from '../Store/Actions/QuestionActions'
import { Redirect } from 'react-router-dom'
import Results from './Results'
import Welcome from './Welcome'

// main page 

class Home extends Component {

    state = { width: 0, height: 0, };
    updateWindowDimensions = this.updateWindowDimensions.bind(this);

    // for displaying the correct ad size
    addSwitch = (width) => {
        switch (true) {
            case (width < 500): return <iframe title='aAds-small' className='aAds-small' data-aa="1373080" src="//ad.a-ads.com/1373080?size=320x50" scrolling="no" allowtransparency="true"></iframe>;
            case width < 860: return <iframe title='aAds-med' className='aAds-med' data-aa="1373078" src="//ad.a-ads.com/1373078?size=468x60" scrolling="no" allowtransparency="true"></iframe>;
            default: return <iframe title='aAds-big' className="aAds-big" data-aa="1373068" src="//ad.a-ads.com/1373068?size=728x90" scrolling="no" allowtransparency="true" ></iframe >;
        }
    }

    chooseAnswerOne = () => {
        const question = {
            ...this.props.questions.currentQuestion,
            answer: 'one'
        }
        // these should not be 2 seperate functinons and its probably effing stuff up.
        this.props.newQuestion(question)
        this.props.updateQuestion(question)
    }

    chooseAnswerTwo = () => {
        const question = {
            ...this.props.questions.currentQuestion,
            answer: 'two'
        }
        this.props.newQuestion(question)
        this.props.updateQuestion(question)

    }



    componentDidMount() {
        // for selecting the correct adsize based on screen dimensions 
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.props.newQuestion();

        let visited = localStorage["alreadyVisited"];
        if (visited) {
            this.setState({ welcome: false })
        } else {
            this.setState({ welcome: true });
            localStorage["alreadyVisited"] = true;
        }

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {

        const { questions, previousQuestion, profile } = this.props;

        if (profile.gender === '') {
            return <Redirect to='/profile' />
        }



        if (questions.currentQuestion) {
            return (
                <div className='container'>
                    {this.state.welcome === true ?
                        <Welcome />
                        : null}
                    <div className='row'>
                        <h2 className='col s12'>Would you rather</h2>
                        <div className='row col s12'>
                            <button data-target="modal1" className='red col s12  btn-large waves-effect waves-light modal-trigger' onClick={this.chooseAnswerOne}>{questions.currentQuestion.answerOne}</button>
                            <h2 className='col s12  noWhiteSpace'>or</h2>
                            <button data-target="modal1" className=' modal-trigger yuiLightBlue col s12 btn-large waves-effect waves-light ' onClick={this.chooseAnswerTwo}>{questions.currentQuestion.answerTwo}</button>
                        </div>
                        <h2 className='col s12 noWhiteSpace'>?</h2>
                    </div>

                    {//selecting the ad to display
                        this.addSwitch(this.state.width)}

                    {// display a modal wit the results of the previous question.

                        previousQuestion ? <Results /> : null}




                </div>
            )
        }
        else {
            return (<h1> Loading... </h1>)
        }

    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions,
        auth: state.firebase.auth,
        previousQuestion: state.questions.previousQuestion,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateQuestion: (question) => dispatch(updateQuestion(question)),
        newQuestion: (question) => dispatch(newQuestion(question))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),

)(Home)