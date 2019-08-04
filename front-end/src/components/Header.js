import React, { Component } from "react";
import { Link } from "react-router-dom";

import Auth from "../components/Auth";

import "../styles/Header.css"

import profileDefIcon from "../pics/user-profile-default.png";

///////////////////////////////////////////////////////////////////////////////
class Header extends Component {

  ///////////////////////////////////////////////////////////////////////////////
  verifyIfItsAuth(){
    if(Auth.isAuthenticated()){
      return <li><Link to={"/login"}> Login</Link></li>
    } else {
      return <li><Link to={"/logout"}> Logout</Link></li>
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  createHeaderVirtDOM(type) {
    const hMainIconImg =
    (<img src="../../mainIcon.png" width="30" height="30"
      className="d-inline-block align-top"
      alt="" />)
    const hNavDropdownIconImg =
    (<img src={profileDefIcon} width="30" height="30"
      className="d-inline-block align-top"
      alt="" />)

    if ("root" === type) {
      return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <a className="navbar-brand" href="/">
              {hMainIconImg} 3D PrinNet
            </a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarText">
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  {hNavDropdownIconImg}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu">
                  <li className="dropdown-item"><Link to={"/login"}> Login</Link></li>
                  <li className="dropdown-item"><Link to={"/register"}> Register</Link></li>
                </ul>
              </div>
            </div>
        </nav>
      )
    } else {
      return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            {hMainIconImg} 3D PrinNet
          </a>
        </nav>
      )
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  render() {
    const hElements = this.createHeaderVirtDOM(this.props.type);

    return (
      <div className="Header">
        {hElements}
      </div>
    )
  };
}

export default Header;
