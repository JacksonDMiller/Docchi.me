import React, { Component } from 'react'
import { createQuestion } from '../Store/Actions/QuestionActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js';
// form for submiting new questions. Questions start in pending and must be approved before appearing on the site. 
// answers set to 1 instead of 0 to avoid dividing by 0 errors 
class CreateQuestion extends Component {
  state = {
    answerOne: '',
    answerTwo: '',
    responseOne: 1,
    responseTwo: 1,
    maleResOne: 1,
    maleResTwo: 1,
    femaleResOne: 1,
    femaleResTwo: 1,
    creator: ''
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    if (this.state.answerOne === null || this.state.answerTwo === null || this.state.answerOne === '' || this.state.answerTwo === '') {
      event.preventDefault();
      M.toast({ html: 'Please fill out both fields' });
    }
    else {
      event.preventDefault();
      this.setState({ creator: this.props.profile.userName })
      this.props.createQuestion(this.state);
      this.setState({
        answerOne: '',
        answerTwo: ''
      })
    }
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/' />

    return (
      <div className="container">
        <h2>Would you rather</h2>
        <form id='createQuestionFrom' onSubmit={this.onSubmit}>
          <input
            className='createQuestionInput'
            value={this.state.answerOne}
            name="answerOne"
            onChange={this.onChange}
            type="text"
            placeholder="Option One"
          />
          <h2>or</h2>
          <input
            className='createQuestionInput'
            value={this.state.answerTwo}
            name="answerTwo"
            onChange={this.onChange}
            type="text"
            placeholder="Option Two"
          />
          <h2>?</h2>
          <button className='btn yuiLightBlue darken-1' type="submit">Submit Question</button>
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