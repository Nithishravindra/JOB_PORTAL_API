import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "./Authentication";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.Auth = new AuthService();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    console.log("You are logged in");
    console.log(this.state);

    this.Auth.login(this.state.email, this.state.password)
      .then((res) => {
        console.log("in login");
        console.log("Hello");
        this.Auth.getProfile();
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <h2>Login</h2>
          <div className="username">
            <input
              type="text"
              placeholder="Username..."
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
            />
          </div>

          <div className="password">
            <input
              type="password"
              placeholder="Password..."
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
            />
          </div>

          <input type="submit" value="Login" />
        </form>

        <Link to="/register">Create an account</Link>
      </div>
    );
  }
}

export default Login;
