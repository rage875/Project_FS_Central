import React, {Component} from 'react';

// Styles
import "./App.css";

// Containers
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
        <Login />
      </div>
    );
  }
}

export default App;
