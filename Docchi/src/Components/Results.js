import React from 'react'
import { connect } from 'react-redux'


const Results = (props) => {
    var denominator = 0;
    var femaleDenominator = 0;
    var maleDenominator = 0;
    var answer = 0;
    var maleAnswer = 0;
    var femaleAnswer = 0;

    if (props.previousQuestion) {

        if (props.previousQuestion.answer === 'one') {
            denominator = props.previousQuestion.responseOne
            maleDenominator = props.previousQuestion.maleResOne
            femaleDenominator = props.previousQuestion.femaleResOne
        }
        else {
            denominator = props.previousQuestion.responseTwo
            maleDenominator = props.previousQuestion.maleResTwo
            femaleDenominator = props.previousQuestion.femaleResTwo
        }
        var femaleTotal = props.previousQuestion.femaleResOne + props.previousQuestion.femaleResTwo
        var maleTotal = props.previousQuestion.maleResOne + props.previousQuestion.maleResTwo
        var total = props.previousQuestion.responseOne + props.previousQuestion.responseTwo
        answer = denominator / total * 100
        maleAnswer = maleDenominator / maleTotal * 100
        femaleAnswer = femaleDenominator / femaleTotal * 100
        if (isNaN(femaleAnswer)) {
            femaleAnswer = 50;
        }
        if (isNaN(maleAnswer)) {
            maleAnswer = 50;
        }
    }
    return (
        <div className="container row">
            
            <p className="col s12 flow-text">You would rather {props.previousQuestion.answer === 'one' ? props.previousQuestion.answerOne : props.previousQuestion.answerTwo} than {props.previousQuestion.answer === 'one' ? props.previousQuestion.answerTwo : props.previousQuestion.answerOne}. </p>
            <p className="col s12 flow-text">See who agreed with you!</p>
            <div className="col s12 row result-box-container">
                <div className="col s4 purple darken-1 card result-box" >
                    <h4 >{answer.toFixed(0)}% of <br /> people</h4>
                </div>
                <div className="col s4 blue lighten-2 card result-box" >
                    <h4 >{maleAnswer.toFixed(0)}% of <br /> men</h4>
                </div>
                <div className="col s4 pink card result-box" >
                    <h4 >{femaleAnswer.toFixed(0)}% of <br /> women</h4>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        previousQuestion: state.questions.previousQuestion
    }
}

export default connect(mapStateToProps)(Results)

