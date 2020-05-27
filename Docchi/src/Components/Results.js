import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { connect } from 'react-redux'
import Chart from "react-google-charts";

class Results extends Component {
    // a modal that displays 3 pie charts of the reults of the previous question using google charts
    // i would like to stop the highlight functionality of clicking on google charts but have not been able to find out how yet.

    componentDidMount() {
        const options = {

            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: true,
            startingTop: "4%",
            endingTop: "10%"
        };
        M.Modal.init(this.Modal, options);
        let instance = M.Modal.getInstance(this.Modal);
        instance.open()


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
            answer = parseInt((denominator / total * 100).toFixed(0))
            maleAnswer = maleDenominator / maleTotal * 100
            femaleAnswer = femaleDenominator / femaleTotal * 100
            if (isNaN(femaleAnswer)) {
                femaleAnswer = 100;
            }
            if (isNaN(maleAnswer)) {
                maleAnswer = 100;
            }
        }

        return (

            < div >
                <div
                    ref={Modal => {
                        this.Modal = Modal;
                    }}
                    id="modal1"
                    className="modal"
                >

                    <div className="modal-content reultsModal">
                        <div className="container row reultsModal">

                            <p className="col s12 flow-text">You would rather {this.props.previousQuestion.answer === 'one' ? this.props.previousQuestion.answerOne : this.props.previousQuestion.answerTwo} than {this.props.previousQuestion.answer === 'one' ? this.props.previousQuestion.answerTwo : this.props.previousQuestion.answerOne}. </p>
                            <p className="col s12 flow-text">See who agreed with you!</p>

                            <div className="col s12 row result-box-container">
                                <div className="row col s12 card result-box valign-wrapper" >
                                    <span className='col s6 flow-text'>{answer}% of people</span>
                                    <div className='col s6'>
                                        <Chart className=''
                                            height={'8vh'}
                                            chartType="PieChart"
                                            loader={<div>Loading Chart</div>}
                                            data={[['Pac Man', 'Percentage'], ['', answer], ['', 100 - answer]]}
                                            options={{
                                                pieStartAngle: 180,
                                                legend: 'none',
                                                pieSliceText: 'none',
                                                tooltip: { trigger: 'none' },
                                                slices: {
                                                    0: { color: '#ffab40' },
                                                    1: { color: 'transparent' },
                                                },
                                            }}
                                            rootProps={{ 'data-testid': '1' }}
                                        />
                                    </div>
                                </div>
                                <div className="row col s12 card result-box valign-wrapper" >
                                    <span className='col s6 flow-text'>{maleAnswer.toFixed(0)}% of men</span>
                                    <div className='col s6'>
                                        <Chart className=''
                                            height={'8vh'}
                                            chartType="PieChart"
                                            loader={<div>Loading Chart</div>}
                                            data={[['Pac Man', 'Percentage'], ['', maleAnswer], ['', 100 - maleAnswer]]}
                                            options={{
                                                pieStartAngle: 180,
                                                legend: 'none',
                                                pieSliceText: 'none',
                                                tooltip: { trigger: 'none' },
                                                slices: {
                                                    0: { color: '#56b1bf' },
                                                    1: { color: 'transparent' },
                                                },
                                            }}
                                            rootProps={{ 'data-testid': '2' }}
                                        />
                                    </div>
                                </div>
                                <div className="row col s12 card result-box valign-wrapper" >
                                    <span className='col s6 flow-text'>{femaleAnswer.toFixed(0)}% of women</span>
                                    <div className='col s6'>
                                        <Chart className=''
                                            height={'8vh'}
                                            chartType="PieChart"
                                            loader={<div>Loading Chart</div>}
                                            data={[['Pac Man', 'Percentage'], ['', femaleAnswer], ['', 100 - femaleAnswer]]}
                                            options={{

                                                pieStartAngle: 180,
                                                legend: 'none',
                                                pieSliceText: 'none',
                                                tooltip: { trigger: 'none' },
                                                slices: {
                                                    0: { color: '#d73a31' },
                                                    1: { color: 'transparent' },
                                                },
                                            }}
                                            rootProps={{ 'data-testid': '3' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-close waves-effect waves-red btn-flat valign-wrapper">
                            Next Question  <i className="large material-icons red-text">arrow_forward</i>
                        </button>
                    </div>
                </div>

            </div >

        );
    }
}


const mapStateToProps = (state) => {
    return {
        previousQuestion: state.questions.previousQuestion
    }
}

export default connect(mapStateToProps)(Results)