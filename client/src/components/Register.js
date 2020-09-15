import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: "",
      email: "",
      password: "",
      role: "User",
      checked: false,
      errors: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.displayLogin = this.displayLogin.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCheck(e) {
    this.setState({
      checked: !this.state.checked,
    });

    if (this.state.checked === true) {
      this.setState({
        role: "user",
      });
    } else {
      this.setState({
        role: "employer",
      });
    }
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
    let pass;

    this.setState({
      [name]: value,
    });

    if (e.target.name === "fullname") {
      if (
        e.target.value === "" ||
        e.target.value === null ||
        e.target.value.length < 4
      ) {
        this.setState({
          fullnameError: true,
        });
      } else {
        this.setState({
          fullnameError: false,
          fullname: e.target.value,
        });
      }
    }

    if (e.target.name === "email") {
      this.validateEmail(e.target.value);
    }

    if (e.target.name === "password") {
      if (
        e.target.value === "" ||
        e.target.value === null ||
        e.target.value.length < 8
      ) {
        this.setState({
          passwordError: true,
        });
      } else {
        this.setState({
          passwordError: false,
          password: e.target.value,
          pass: e.target.value,
        });
      }
    }

    if (e.target.name === "confirmPassword") {
      if (
        e.target.value === "" ||
        e.target.value === null ||
        e.target.value !== pass
      ) {
        this.setState({
          confirmPasswordError: true,
        });
      } else {
        this.setState({
          confirmPasswordError: false,
          confirmPassword: e.target.value,
        });
      }
    }
  }

  displayLogin(e) {
    e.preventDefault();
    console.log("You have successfully registered");
    console.log(this.state);
    this.setState({
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const data = {
      name: this.state.fullname,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.confirmPassword,
      role: this.state.role,
    };

    console.log(data);

    return await axios
      .post("http://localhost:3000/api/v1/users/signup", data)
      .then(function (response) {
        console.log("In item");
        console.log(response);
        localStorage.setItem("token", response.data.token);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="register">
        <form onSubmit={this.displayLogin}>
          <h2>Register</h2>

          <div className="name">
            <input
              type="text"
              placeholder="Full Name *"
              name="fullname"
              value={this.state.fullname}
              onChange={this.handleChange}
            />
            {this.state.fullnameError ? (
              <h5 className="validator">
                FullName should atleast be 4 characters
              </h5>
            ) : (
              ""
            )}
          </div>

          <div className="email">
            <input
              type="text"
              placeholder="Enter your email *"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {this.state.emailError ? (
              <span className="validator">Enter valid email address</span>
            ) : (
              ""
            )}
          </div>

          <div className="password">
            <input
              type="password"
              placeholder="Password *"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            {this.state.passwordError ? (
              <span className="validator">
                Password should be atleast 8 characters long
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="password">
            <input
              type="password"
              placeholder="Confirm Password *"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
            {this.state.confirmPasswordError ? (
              <span className="validator">Passwords do not match</span>
            ) : (
              ""
            )}
          </div>

          <h3 className="checkbox">
            <input type="checkbox" onChange={this.handleCheck} /> Are you an
            Employer?
          </h3>

          <input type="submit" onClick={this.handleSubmit} value="Register" />
        </form>

        <Link to="/" className="bottom-link">
          Login Here
        </Link>
      </div>
    );
  }
}

export default Register;
