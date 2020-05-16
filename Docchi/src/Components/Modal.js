import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { connect } from 'react-redux'

class Modal extends Component {


    componentDidMount() {
        const options = {
            onOpenStart: () => {
                console.log("Open Start");
            },
            onOpenEnd: () => {
                console.log("Open End");
            },
            onCloseStart: () => {
                console.log("Close Start");
            },
            onCloseEnd: () => {
                console.log("Close End");
            },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
        };
        M.Modal.init(this.Modal, options);
        let instance = M.Modal.getInstance(this.Modal);
        instance.open();
        // instance.close();
        // instance.destroy();




    }

    render() {

        var denominator = 0;
        var femaleDenominator = 0;
        var maleDenominator = 0;
        var answer = 0;
        var maleAnswer = 0;
        var femaleAnswer = 0;

        if (this.props.previousQuestion) {

            if (this.props.previousQuestion.answer === 'one') {
                denominator = this.props.previousQuestion.responseOne
                maleDenominator = this.props.previousQuestion.maleResOne
                femaleDenominator = this.props.previousQuestion.femaleResOne
            }
            else {
                denominator = this.props.previousQuestion.responseTwo
                maleDenominator = this.props.previousQuestion.maleResTwo
                femaleDenominator = this.props.previousQuestion.femaleResTwo
            }
            var femaleTotal = this.props.previousQuestion.femaleResOne + this.props.previousQuestion.femaleResTwo
            var maleTotal = this.props.previousQuestion.maleResOne + this.props.previousQuestion.maleResTwo
            var total = this.props.previousQuestion.responseOne + this.props.previousQuestion.responseTwo
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
            <div>
                <a
                    className="waves-effect waves-light btn modal-trigger"
                    data-target="modal1"
                >
                    Modal
        </a>

                <div
                    ref={Modal => {
                        this.Modal = Modal;
                    }}
                    id="modal1"
                    className="modal"
                >
                    {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
                    <div className="modal-content">
                        <div className="container row">

                            <p className="col s12 flow-text">You would rather {this.props.previousQuestion.answer === 'one' ? this.props.previousQuestion.answerOne : this.props.previousQuestion.answerTwo} than {this.props.previousQuestion.answer === 'one' ? this.props.previousQuestion.answerTwo : this.props.previousQuestion.answerOne}. </p>
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
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-red btn-flat">
                            Disagree
            </a>
                        <a className="modal-close waves-effect waves-green btn-flat">
                            Agree
            </a>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        previousQuestion: state.questions.previousQuestion
    }
}

export default connect(mapStateToProps)(Modal)