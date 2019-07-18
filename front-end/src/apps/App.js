import React, {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom"

// Styles
import "./App.css";

// Containers
import Header from "../components/Header";
import Login from "../containers/Login";


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
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
