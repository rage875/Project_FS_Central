import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "../styles/Login.css";

///////////////////////////////////////////////////////////////////////////////
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  ///////////////////////////////////////////////////////////////////////////////
  validateForm() {
    const { username, password } = this.state;

    return (0 < username.length && 0 < password.length);
  }

  ///////////////////////////////////////////////////////////////////////////////
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  ///////////////////////////////////////////////////////////////////////////////
  handleSubmit(event) {
    event.preventDefault();
    const user = this.state;

    fetch(`${this.props.server_url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => this.handleResponse(data))
      .catch(error => console.log("Error:", error));
  }

  ///////////////////////////////////////////////////////////////////////////////
  handleResponse(data) {
    console.log("[Login] Update profile module with:", data.username);
    console.log("[Login] Token:", data.token);
    if ("" !== data.username) {
      this.setState({
        username: data.username,
        redirect: true,
      })
    } else {
      console.log("[Login] User not found");
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  renderRedirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect push to={{
          pathname: `/profile`,
          state: {
              username: this.state.username,
              accessType: "private",
          }
        }} />
      )
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  render() {
    return (
      <div className="Login">
        {
          this.renderRedirect()
        }
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label> Username</label>
            <input
                type="text"
                className="form-control"
                placeholder=""
                name="username"
                value={this.state.value}
                onChange={this.handleChange} />
          </div>

          <div className="form-group">
            <label> Password</label>
          <input
              type="password"
              className="form-control"
              placeholder=""
              name="password"
              value={this.state.value}
              onChange={this.handleChange} />
          </div>

          <button
            type="submit"
            className="btn btn-primary col text-center"
            disabled={!this.validateForm()}> Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
