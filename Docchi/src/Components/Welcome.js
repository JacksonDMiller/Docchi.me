import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { connect } from 'react-redux';


class Welcome extends Component {


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

        return (

            < div >
                <div
                    ref={Modal => {
                        this.Modal = Modal;
                    }}
                    id="modal2"
                    className="modal"
                >

                    <div className="modal-content reultsModal">
                        <div className="container row reultsModal">

                            <p className="col s12 flow-text red-text">Welcome!</p>
                            <button class="modal-close loginBtn loginBtn--google">
                                Login with Google
                                </button>
                            <p>to earn sats and have your answers recoreded or</p>
                            <button className="modal-close input-field indigo darken-3 btn modal-trigger">Play for fun</button>

                        </div>
                    </div>
                    <div className="modal-footer">
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

export default connect(mapStateToProps)(Welcome)