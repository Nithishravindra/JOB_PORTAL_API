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

  validateEmail(email) {
    const pattern = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if (result === true) {
      this.setState({
        emailError: false,
        email: email,
      });
    } else {
      this.setState({
        emailError: true,
      });
    }
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });

    if (e.target.name === "email") {
      this.validateEmail(e.target.value);
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    let res = await this.Auth.login(this.state.email, this.state.password);
    const { history } = this.props;

    console.log(res);

    if (res.status === 200) {
      console.log(res.data);
      this.Auth.setToken(res.data.token);
      history.push("/home");
    } else {
      this.setState({
        errMess: res.data.message,
      });
    }
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <h2>Login</h2>
          <div className="username">
            <input
              type="text"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
            />
            {this.state.emailError ? (
              <h5 className="validator">Enter valid Email</h5>
            ) : (
              ""
            )}
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

        {this.state.errMess ? (
          <h5 className="validator">{this.state.errMess}</h5>
        ) : (
          ""
        )}

        <Link to="/register" className="bottom-link">
          Create an account
        </Link>
      </div>
    );
  }
}

export default Login;
