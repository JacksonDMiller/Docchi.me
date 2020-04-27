import { combineReducers } from 'redux'
import questionReducer from './questionsReducer'
import authReucer from './authReducer'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore' // <- needed if using firestore

export default combineReducers({
  questions: questionReducer,
  auth: authReucer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})