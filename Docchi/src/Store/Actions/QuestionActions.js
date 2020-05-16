import firebase from 'firebase/app'
import M from 'materialize-css/dist/js/materialize.min.js';


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


export const newQuestion = (previousQuestion) => {

  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()
    const firestore = getFirebase().firestore()
    var question = ''

    function getQuestion() {
      const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let autoId = '';
      for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      let questionRef = firestore.collection("questions")
      questionRef.where(firebase.firestore.FieldPath.documentId(), '>=', autoId)
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
        )
    }
    getQuestion()
  }

}
