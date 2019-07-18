import React, {Component} from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: ""
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    const {username, password, confirmPassword} = this.state;

    return (0 < username.length && 
            0 < password.length &&
            0 < confirmPassword);
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.state;

    console.log(`User register: ${user}, submit event`);

    fetch(`${this.props.server_url}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => console.log(res))
    .catch(error=> console.error("Error:", error));
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
          value="login"
          disabled={!this.validateForm()}/>
      </form>
    );
  }
}

export default Register;