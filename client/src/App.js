import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/home" component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
