import React, { Component } from 'react'
import { createQuestion } from '../Store/Actions/QuestionActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js';


class CreateQuestion extends Component {
  state = {
    questionOne: '',
    questionTwo: '',
    responseOne: 0,
    responseTwo: 0,
    maleResOne: 0,
    maleResTwo: 0,
    femaleResOne: 0,
    femaleResTwo: 0,
    creator: ''
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    if (this.state.questionOne === null || this.state.questionTwo === null || this.state.questionOne === '' || this.state.questionTwo === '') {
      event.preventDefault();
      M.toast({ html: 'Please fill out both fields' });
    }
    else {
      event.preventDefault();
      this.setState({ creator: this.props.profile.userName })
      this.props.createQuestion(this.state);
      this.setState({
        questionOne: '',
        questionTwo: ''
      })
    }
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/' />

    return (
      <div className="container">
        <h1>Would you rather</h1>
        <form id='createQuestionFrom' onSubmit={this.onSubmit}>
          <input
            class='createQuestionInput'
            value={this.state.questionOne}
            name="questionOne"
            onChange={this.onChange}
            type="text"
            placeholder="Option One"
          />
          <h1>or</h1>
          <input
            class='createQuestionInput'
            value={this.state.questionTwo}
            name="questionTwo"
            onChange={this.onChange}
            type="text"
            placeholder="Option Two"
          />
          <h1>?</h1>
          <button className='btn' type="submit">Submit Question</button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createQuestion: (creds) => dispatch(createQuestion(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion)