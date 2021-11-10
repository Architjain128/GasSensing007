import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Data from './Components/Data';
import Alert from './Components/Alert';
import { BrowserRouter, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/home" exact component={Home}/>
      <Route path="/data" exact component={Data}/>
      <Route path="/alert" exact component={Alert}/>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
