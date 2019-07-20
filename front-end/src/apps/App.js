import React, {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom"

// Styles
import "./App.css";

// Components
import Header from "../components/Header";

// Containers
import Login from "../containers/Login";
import Register from "../containers/Register";
import Printers from "../containers/Printers";
import Profile from "../containers/Profile"

// Global fetch from json-server -w db.json
const SERVER_URL = "http://localhost:9000"

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render(){
    return (
      <div>
        <BrowserRouter>
          <Route path={"/"} component = {Header}/>
          <Route
            path={"/"}
            render = {() => <Printers server_url={SERVER_URL}/>}
          />
          <Route
            path={"/login"}
            render = {()=> <Login server_url={SERVER_URL}/>}
          />
          <Route
            path={"/profile"}
            render = {()=> <Profile server_url={SERVER_URL}/>}
          />
          <Route
            path={"/register"}
            render = {()=> <Register server_url={SERVER_URL}/>}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
