import React from 'react';
import './App.css';
import Home from './Components/Home'
import CreateQuestion from './Components/CreateQuestion'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import 'materialize-css/dist/css/materialize.min.css';
import Profile from './Components/Profile'
import Approver from './Components/Approver'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/home' component={Home} />
          <Route path='/createquestion' component={CreateQuestion} />
          <Route path='/profile' component={Profile} />
          {/*  approver can only be accesed by the admin userId. it is set in the approver file */}
          <Route path='/approver' component={Approver} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
