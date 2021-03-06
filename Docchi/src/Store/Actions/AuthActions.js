import M from 'materialize-css/dist/js/materialize.min.js';

export const signOut = () => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}

// create an account or login. If creating an account create a document in the users datbase for the new user 
export const createAccountWithGoogle = (newUser) => {

  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()
    const firestore = getFirebase().firestore()
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(async resp => {
      if (resp.additionalUserInfo.isNewUser === true) {
        await firestore.collection('users').doc(resp.user.uid).set({
          userId: resp.user.uid,
          dateCreated: new Date(),
          gender: '',
          userName: resp.user.displayName,
          email: resp.user.email,
          sats: 300,
          submissions: [],
          achievements: [],
          questionsAnswered: [],
          renegadeCounter: 0,
          conformistCounter: 0,
        }).catch(err => console.log(err));
        dispatch({ type: 'SIGNUP_SUCCESS' });
        M.toast({ html: 'Thanks for signing up here is 300 sats on us' });
      }
      else {
        dispatch({ type: 'LOGIN_SUCCESS' });
        M.toast({ html: 'Welcome Back' });
      };
    })
      .catch((err) => {
        console.log(err)
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  }
}

// used to select the users gender. Should be expanded in the future to allow for chaning your user name. 
export const updateAccount = (details) => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore()
    return firestore.collection('users').doc(getState().firebase.auth.uid).update({
      gender: details.gender
    })
  }
}