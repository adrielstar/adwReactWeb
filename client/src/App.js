import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/navbar/index';
import Landing from './components/landing/landing';
import Login from './components/login/index';
import Register from './components/register/index';
import Profile from './components/profile/index';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Route exact path="/" component={Landing} />
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
        </div>
      </div>
    </Router>
  );
}

export default App;
