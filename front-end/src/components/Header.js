import React from "react";
import {Link} from "react-router-dom";


function Header() {
  return(
    <div>
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <ul className="nav navbar-nav">
              <li><Link to={"/login"}> Login</Link></li>
              <li><Link to={"/register"}> Register</Link></li>
              <li><Link to={"/profile"}> Profile</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;