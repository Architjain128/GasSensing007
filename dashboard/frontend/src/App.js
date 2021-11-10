import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
// import Lineplot from './Components/Lineplot';
import Data from './Components/Data';
import Graph from './Components/Graph';
import Alert from './Components/Alert';
import { BrowserRouter, Route, Switch} from 'react-router-dom';


// LINEPLOT HAS BEEN ADDED IN GRAPH....CORRECT THEM IF THESE ARE DIFFERENT THINGS


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/home" exact component={Home}/>
      {/* <Route path="/line_plot" exact component={Lineplot}/> */}
      <Route path="/data" exact component={Data}/>
      <Route path="/graph" exact component={Graph}/>
      <Route path="/alert" exact component={Alert}/>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
