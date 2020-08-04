import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
