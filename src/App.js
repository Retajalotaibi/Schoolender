import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";

import NavBar from "./components/common/navBar";
import RegisterForm from "./components/common/register";
import LoginForm from "./components/common/login";
import NotFound from "./components/common/not-Found";
import HomePage from "./pages/Homepage";
import Cookies from "js-cookie";
import { findLastKey } from "lodash";
// import { messaging } from "./components/firebase";

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
  };
  componentDidMount() {
    // messaging.requestPermission()
    const user = Cookies.get("UID");
    if (user) this.setState({ isLoggedIn: true, user });
  }
  handleLogging = (user) => {
    this.setState({ isLoggedIn: true, user });
    Cookies.set("UID", user.uid);
  };
  handleLogout = () => {
    this.setState({ isLoggedIn: findLastKey, user: null });
    Cookies.remove("UID");
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
            <Route
              exact
              path="/"
              render={() => <HomePage handleLogout={this.handleLogout} />}
            />
          </div>
        </main>
      </Switch>
    );
  }
}

export default App;
