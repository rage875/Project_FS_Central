import React, {Component} from "react";


// Global fetch from json-server -w db.json
const SERVER_URL = "http://localhost:9000"

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
    event.preventDefault();
    const user = this.state;

    console.log(`User login: ${user.username}:${user.password}, submit event`);

    fetch(`${SERVER_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    //.then(res => res.json())
    .then(res => console.log(res))
    //.then(text => console.log(text))
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
        <input
          type="submit"
          value="login"
          disabled={!this.validateForm()}/>
      </form>
    );
  }
}

export default Login;