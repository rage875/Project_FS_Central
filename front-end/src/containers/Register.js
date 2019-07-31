import React, { Component } from "react";
import { Redirect } from "react-router-dom";

///////////////////////////////////////////////////////////////////////////////
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  ///////////////////////////////////////////////////////////////////////////////
  validateForm() {
    const { email, password, confirmPassword } = this.state;

    return (0 < email.length &&
      0 < password.length &&
      0 < confirmPassword);
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
    const { email, password, confirmPassword } = this.state;

    console.log(`User register: ${email}, submit event`);

    if (password === confirmPassword) {
      fetch(`${this.props.server_url}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(data => this.setState({username: data.username, redirect: true}))
        .catch(error => console.error("Error:", error));
    } else {
      alert("Password and confirmPassword doesn't match");
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
      <div>
        {
          this.renderRedirect()
        }
        <form onSubmit={this.handleSubmit}>
          <label>
            email:
          <input
              type="email"
              name="email"
              value={this.state.value}
              onChange={this.handleChange} />
          </label>
          <label>
            password:
          <input
              type="text"
              name="password"
              value={this.state.value}
              onChange={this.handleChange} />
          </label>
          <label>
            confirmPassword:
          <input
              type="text"
              name="confirmPassword"
              value={this.state.value}
              onChange={this.handleChange} />
          </label>
          <input
            type="submit"
            value="submit"
            disabled={!this.validateForm()} />
        </form>
      </div>
    );
  }
}

export default Register;
