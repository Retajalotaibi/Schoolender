import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";

import NavBar from "./components/common/navBar";
import RegisterForm from "./components/common/register";
import LoginForm from "./components/common/login";
import NotFound from "./components/common/not-Found";
import HomePage from "./pages/Homepage";

class App extends Component {
  state = {
    isLoggedIn: true,
    user: null,
  };
  handleLogging = (user) => {
    this.setState({ isLoggedIn: true, user });
    console.log(this.state.user);
  };
  render() {
    return (
      <Switch>
        <main className="no-left-m">
          <div>
            {this.state.isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <Redirect to="/register" />
            )}
            <Route
              path="/register"
              render={(props) => (
                <RegisterForm handleLogging={this.handleLogging} />
              )}
            />
            <Route
              path="/login"
              render={(props) => (
                <LoginForm handleLogging={this.handleLogging} />
              )}
            />
            <Route exact path="/" render={() => <HomePage />} />
          </div>
        </main>
      </Switch>
    );
  }
}

export default App;
