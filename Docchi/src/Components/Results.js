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
            denominator = props.previousQuestion.maleResOne
            maleDenominator = props.previousQuestion.maleResOne
            femaleDenominator = props.previousQuestion.femaleResOne
        }
        else {
            denominator = props.previousQuestion.responseTwo
            maleDenominator = props.previousQuestion.maleResOne
            femaleDenominator = props.previousQuestion.femaleResTwo
        }
        var femaleTotal = props.previousQuestion.femaleResOne + props.previousQuestion.femaleResTwo
        var maleTotal = props.previousQuestion.maleResOne + props.previousQuestion.maleResTwo
        var total = props.previousQuestion.responseOne + props.previousQuestion.responseTwo
        answer = denominator / total * 100
        maleAnswer = maleDenominator / maleTotal * 100
        femaleAnswer = femaleDenominator / femaleTotal * 100
        if (isNaN(femaleAnswer)) {
            femaleAnswer = 0;
        }
        if (isNaN(maleAnswer)) {
            maleAnswer = 0;
        }
    }
    return (
        <div className="container row">
            <h4 className="col s12 noWhiteSpace">You would rather {props.previousQuestion.answer === 'one' ? props.previousQuestion.questionOne : props.previousQuestion.questionTwo} than {props.previousQuestion.answer === 'one' ? props.previousQuestion.questionTwo : props.previousQuestion.questionOne}. </h4>
            <div className="col s12 row result-box-container">
                <div className="col s4 teal card result-box" >
                    <h4 >{answer.toFixed(0)}% of <br /> people</h4>
                </div>
                <div className="col s4 blue card result-box" >
                    <h4 >{maleAnswer.toFixed(0)}% of <br /> men</h4>
                </div>
                <div className="col s4 pink card result-box" >
                    <h4 >{femaleAnswer.toFixed(0)}% of <br /> women</h4>
                </div>
            </div>
            <h4 className="col s12 noWhiteSpace">agreed with you!</h4>


        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        previousQuestion: state.questions.previousQuestion
    }
}

export default connect(mapStateToProps)(Results)

