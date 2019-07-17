import React, {Component} from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    const {username,password} = this.state;

    return (0 < username.length && 0 < password.length);
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const {username, password} = this.state;

    console.log(`User login: ${username}:${password}, submit event`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          username:
          <input 
            type="email"
            name="username"
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
        <input
          type="submit"
          value="login"
          disabled={!this.validateForm()}/>
      </form>
    );
  }
}

export default Login;