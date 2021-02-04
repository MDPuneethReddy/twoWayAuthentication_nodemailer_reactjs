import React from 'react';
import './App.css';
import { Router,RouteComponentProps } from "@reach/router"
import 'antd/dist/antd.css';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { Otp } from './components/Otp';
import { Application } from './components/Application';
interface Iprops extends RouteComponentProps{

}
function App(props:Iprops) {
  return (
    <div className="App">
    <Router>
      <Login path="/" />
      <Registration path="/Registration" />
      <Otp path="/Otp" />
      <Application path="/Application" />
    </Router>
    </div>
    
  );
}

export default App;
