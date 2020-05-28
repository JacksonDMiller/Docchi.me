import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider, useSelector } from 'react-redux'
import rootReducer from './Store/Reducers/rootReducer'
import { createStore, applyMiddleware } from 'redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore' // <- needed if using firestore
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import keys from './keys'

// wait for auth
function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <div></div>;
    return children
}

// set up firebase 
const fbConfig = keys;

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

firebase.firestore()
// uncoment for testing functions 
// firebase.functions().useFunctionsEmulator('http://localhost:5001')
firebase.functions()
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(getFirebase))))

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance, // <- needed if using firestore

}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
                    <App />
            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>, document.getElementById('root'));


