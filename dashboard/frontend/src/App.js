import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import Lineplot from './Components/Lineplot';
import Navbar from './Components/NavigationBar'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <Navbar/>
    <div className="App">
      <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/dashboard" exact component={Dashboard}/>
      <Route path="/line_plot" exact component={Lineplot}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
