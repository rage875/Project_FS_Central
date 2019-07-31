import React, { Component } from "react";
import { Link } from "react-router-dom";

import Auth from "../components/Auth";

///////////////////////////////////////////////////////////////////////////////
function createHeaderVirtDOM(type) {
  if ("root" === type) {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <ul className="nav navbar-nav">
              <li><Link to={"/login"}> Login</Link></li>
              <li><Link to={"/register"}> Register</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  } else {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <ul className="nav navbar-nav">
              <li><Link to={"/"}> Home</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

///////////////////////////////////////////////////////////////////////////////
class Header extends Component {
  
  verifyIfItsAuth(){
    if(Auth.isAuthenticated()){
      return <li><Link to={"/login"}> Login</Link></li>
    } else {
      return <li><Link to={"/logout"}> Logout</Link></li>
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  render() {
    const header = createHeaderVirtDOM(this.props.type);

    return (
      <div>
      {header}
      </div>
    )
  };
}

export default Header;
