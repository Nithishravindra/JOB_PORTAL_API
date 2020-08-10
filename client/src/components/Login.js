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

  validateEmail(email){
    const pattern = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if(result===true){
      this.setState({
        emailError:false,
        email:email
      })
    } else{
      this.setState({
        emailError:true
      })
    }
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });

    if(e.target.name==='email'){
      this.validateEmail(e.target.value);
    }

    if(e.target.name==='password'){
      if(e.target.value==='' || e.target.value===null || e.target.value.length < 8){
        this.setState({
          passwordError:true
        })
      } else {
        this.setState({
          passwordError:false,
          password:e.target.value,
          pass: e.target.value,
        })
      }
   }
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
             {this.state.emailError ? <h5 className="validator">Username should atleast be 4 characters</h5> : ''}
          </div>

          <div className="password">
            <input
              type="password"
              placeholder="Password..."
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
            />
             {this.state.passwordError ? <h5 className="validator">Password should atleast be 8 characters</h5> : ''}
          </div>

          <input type="submit" value="Login" />
        </form>

        <Link to="/register" className="bottom-link">Create an account</Link>
      </div>
    );
  }
}

export default Login;
