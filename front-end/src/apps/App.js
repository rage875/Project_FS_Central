import React, {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom"

// Styles
import "./App.css";

// Containers
import Header from "../components/Header";
import Login from "../containers/Login";
import Register from "../containers/Register";

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
        <BrowserRouter history>
          <Route path={"/"} component = {Header}/>
          <Route path={"/login"} component = {Login}/>
          <Route
            path={"/register"}
            component = {()=> <Register server_url={SERVER_URL}/>}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
