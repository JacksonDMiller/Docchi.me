import React from 'react';
import './App.css';
import Home from './Components/Home'
import CreateAccount from './Components/CreateAccount';
import SignIn from './Components/SignIn';
import SignOut from './Components/SignOut';
import CreateQuestion from './Components/CreateQuestion'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import 'materialize-css/dist/css/materialize.min.css';
import Profile from './Components/Profile'

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
      <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/createaccount' component={CreateAccount} />
      <Route path='/signin' component={SignIn} />
      <Route path='/signout' component={SignOut} />
      <Route path='/createquestion' component={CreateQuestion} />
      <Route path='/profile' component={Profile} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
