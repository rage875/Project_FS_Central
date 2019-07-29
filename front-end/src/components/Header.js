import React from "react";
import { Link } from "react-router-dom";

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
function Header(props) {
  const Header = createHeaderVirtDOM(props.type);
  return (
    <div>
      {Header}
    </div>
  );
}

export default Header;
