import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  //PLEASE DO REFRESH AFTER STARTING MY APP...IT'S WORKING
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/dashboard" exact component={Dashboard}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
