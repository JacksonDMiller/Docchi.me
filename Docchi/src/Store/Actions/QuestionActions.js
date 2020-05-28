import firebase from 'firebase/app'
import M from 'materialize-css/dist/js/materialize.min.js';

// creates a question and checks if it is your first question submited if so it awards the first question achievment 
export const createQuestion = (newQuestion) => {
  return (dispatch, getState, getFirebase) => {
    const profile = getState().firebase.profile;
    const auth = getState().firebase.auth
    const firebase = getFirebase()
    const firestore = getFirebase().firestore()

    firestore.collection('questions').add({
      ...newQuestion,
      createdAt: new Date(),
      creator: profile.userName,
      creatorId: profile.userId,
      status: 'Pending'
    }).then((docRef) => {
      var profileRef = firestore.collection('users').doc(auth.uid)
      profileRef.get().then((doc) => {
        var data = doc.data()
        if (data.submissions.length === 0) {
          const addAchievement = getFirebase().functions().httpsCallable('addAchievement')
          addAchievement({ achievement: 'Submit your first question' })
            .then(result => M.toast({ html: 'Submited your first question' })).catch(err => console.log(err))
        }
      })
      profileRef.update({
        submissions: firebase.firestore.FieldValue.arrayUnion(docRef.id)
      });
    })
      .then(() => {
        dispatch({ type: 'QUESTION_SUBMIT_SUCCESS' });
        M.toast({ html: 'Question Submited' });
      }).catch((err) => {
        dispatch({ type: 'QUESTION_SUBMIT_ERROR', err });
      });
  }
}

// used for incrimitning responses. datbase rules prevent increasing response fields by more that one.
// makes checks for the Renegade and generalist achievemnts 
export const updateQuestion = (question) => {
  return (dispatch, getState, getFirebase) => {
    var conformistCounter = 0;
    var renegadeCounter = 0;
    const firestore = getFirebase().firestore()
    var majority = ''
    const addAchievement = getFirebase().functions().httpsCallable('addAchievement')

    var profile = getState().firebase.profile

    if (question.responseOne > question.responseTwo) {
      majority = 'one'
    }
    else {
      majority = 'two'
    }

    if (question.answer === 'one') {
      question.responseOne = question.responseOne + 1
      if (profile.gender === 'Male') {
        question.maleResOne = question.maleResOne + 1
      }
      else { question.femaleResOne = question.femaleResOne + 1 }
    }
    if (question.answer === 'two') {
      question.responseTwo = question.responseTwo + 1
      if (profile.gender === 'Male') {
        question.maleResTwo = question.maleResTwo + 1
      }
      else { question.femaleResTwo = question.femaleResTwo + 1 }
    }
    if (profile.isEmpty === false) {
      if (profile.questionsAnswered.length === 0) {
        const addAchievement = getFirebase().functions().httpsCallable('addAchievement')
        addAchievement({ achievement: 'Answer your first question' })
          .then(result => {
            if (result.data !== 'error') {
              M.toast({ html: 'Answered your first question' })
            }
          }
          ).catch(err => console.log(err))
      }
      if (!profile.achievements.includes('Conformist: Answer 5 questions in agreement with the majority') || !profile.achievements.includes('Renegade: Answer 5 questions against the majority')) {
        if (question.answer === majority) {
          conformistCounter = getState().firebase.profile.conformistCounter + 1
          if (conformistCounter === 5) {
            addAchievement({ achievement: 'Conformist: Answer 5 questions in agreement with the majority' }).then(result => {
              if (result.data !== 'error') {
                M.toast({ html: 'Conformist: Answered 5 questions in agreement with the majority' })
              }
            })
          }

        }
        else {
          renegadeCounter = getState().firebase.profile.renegadeCounter + 1
          if (renegadeCounter === 5) {
            addAchievement({ achievement: 'Renegade: Answer 5 questions against the majority' }).then(result => {
              if (result.data !== 'error') {
                M.toast({ html: 'Renegade: Answered 5 questions against the majority' })
              }
            })
          }
        }
      }
      firestore.collection('users').doc(getState().firebase.auth.uid).update({
        questionsAnswered: firebase.firestore.FieldValue.arrayUnion(question.id),
        renegadeCounter: renegadeCounter,
        conformistCounter: conformistCounter

      })
    }
    firestore.collection('questions').doc(question.id).update({
      femaleResTwo: question.femaleResTwo,
      femaleResOne: question.femaleResOne,
      maleResTwo: question.maleResTwo,
      maleResOne: question.maleResOne,
      responseOne: question.responseOne,
      responseTwo: question.responseTwo,
    }).then(() => {
      dispatch({ type: 'QUESTION_UPDATE_SUCCESS', question });
    }).catch((err) => {
      dispatch({ type: 'QUESTION_UPDATE_ERROR', err });
    });

  }

}

// gets the next question. uses a randomly generated Id and then selects the question closes to that randomly generated id. 
// it's not a very good random. Some questions are far more likely to be selected. Could be fixed by using a field that can be updated and updating it eachtime it is selected.
export const newQuestion = (previousQuestion) => {


  return async (dispatch, getState, getFirebase) => {
    dispatch({ type: 'QUESTION_REQUESTED' });
    const firebase = getFirebase()
    const firestore = getFirebase().firestore()
    var question = ''

    function getQuestion() {
      console.log('i was called')
      const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let autoId = '';
      for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      let questionRef = firestore.collection("questions")
      questionRef.where('status', '==', 'Approved').where(firebase.firestore.FieldPath.documentId(), '>=', autoId)
        .limit(1).get().then(async doc => {
          if (doc.docs[0]) {
            if (previousQuestion) {
              var previousQuestionId = previousQuestion.id
            }
            if (previousQuestionId === doc.docs[0].id) {
              console.log('trying again')
              getQuestion();
            }
            else {
              question = { ...doc.docs[0].data(), id: doc.docs[0].id }
              dispatch({ type: 'QUESTION_FETCH_SUCCESS', question, previousQuestion });
            }
          }
        }
        ).catch(err => console.log(err))
    }
    getQuestion()
  }

}

// for approving questions from the admin page. 
// low security this should be improved
export const approveQuestion = (question) => {
  return (dispatch, getState, getFirebase) => {

    const firestore = getFirebase().firestore()

    firestore.collection('questions').doc(question).update({
      status: 'Approved'
    }).then(() => {
      dispatch({ type: 'QUESTION_APPROVAL_SUCCESS' });
    }).catch((err) => {
      alert(err)
      dispatch({ type: 'QUESTION_APPROVAL_ERROR', err });
    });

  }

}

// for rejecting questions from the admin page. 
// low security this should be improved
export const rejectQuestion = (question) => {
  return (dispatch, getState, getFirebase) => {

    const firestore = getFirebase().firestore()

    firestore.collection('questions').doc(question).update({
      status: 'Rejected'
    }).then(() => {
      dispatch({ type: 'QUESTION_REJECTED_SUCCESS' });
    }).catch((err) => {
      alert(err)
      dispatch({ type: 'QUESTION_REJECTED_ERROR', err });
    });

  }

}


// grab a list of questions that a user has submited to output on the profile page.
export const getSubmitedQuestions = (id) => {
  console.log('profile get list was called')
  return (dispatch, getState, getFirebase) => {

    const firestore = getFirebase().firestore()

    let questionRef = firestore.collection("questions")
    questionRef.where('creatorId', '==', id).get()
      .then((snapshot) => {
        var submissions = []
        snapshot.forEach(doc => {
          submissions.push(doc.data())
        })
        dispatch({ type: 'QUESTIONS_FETCH_SUCCESS', submissions });
      }).catch((err) => {
        alert(err)
        dispatch({ type: 'QUESTIONS_FETCH_ERROR', err });
      });

  }

}
