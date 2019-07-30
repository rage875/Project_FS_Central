import React, {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom"

// Styles
import "./App.css";

// Pages
import Main from "../pages/root";
import Login from "../pages/login";
import Register from "../pages/register";
import Profile from "../pages/profile";

// Global fetch from json-server -w db.json
const SERVER_URL = "http://localhost:9000"

///////////////////////////////////////////////////////////////////////////////
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  render(){

    return (
      <div>
        <BrowserRouter>
          <Route 
            exact path={"/"}
            render = {() => <Main server_url={SERVER_URL}/>}
          />
          <Route
            exact path={"/login"}
            render = {()=> <Login server_url={SERVER_URL}/>}
          />
          <Route
            //path={"/profile/:username?/:typeAccess"}
            path={"/profile/:username?"}
            render = {({ match, location})=> <Profile server_url={SERVER_URL} params={match.params} state={location.state}/>}
          />
          <Route
            exact path={"/register"}
            render = {()=> <Register server_url={SERVER_URL}/>}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
