import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Data from './Components/Data';
import Alert from './Components/Alert';
import Raw from './Components/raw';
import LandingPage from './Components/landing';
import { BrowserRouter, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Switch>
      <Route path="/" exact component={LandingPage}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/home" exact component={Home}/>
      <Route path="/data" exact component={Data}/>
      <Route path="/raw" exact component={Raw}/>
      <Route path="/alert" exact component={Alert}/>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
