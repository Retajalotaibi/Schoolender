import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

class LoginForm extends Component {
  state = {
    account: { email: "", password: "" },
    error: "",
  };
  //creating refs for the forms value
  handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        this.state.account.email,
        this.state.account.password
      )
      .then((userCredential) => {
        console.log("then");
        const user = userCredential.user;
        this.props.handleLogging(user);
      })
      .catch((error) => {
        console.log("ee");
        const { message } = error;
        this.setState({ error: message });
        console.log(error);
      });
  };
  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
  render() {
    const { account } = this.state;
    return (
      <section className="login">
        <div className="left">
          <h1>Login</h1>
          <div>
            <span>
              <input
                name="email"
                value={account.email}
                onChange={this.handleChange}
                id="email"
                type="text"
                className="form-control"
                placeholder="email"
              />
              <p>Forgot email ?</p>
            </span>
            <span>
              <input
                name="password"
                onChange={this.handleChange}
                value={account.password}
                id="password"
                type="password"
                className="form-control"
                placeholder="password"
              />
              <p className="text-danger">{this.state.error}</p>
            </span>
            <Link to="/profile" className="primary" onClick={this.handleSubmit}>
              Login
            </Link>
          </div>
        </div>
        <div className="right">
          <div>
            <h1>Welcome Back! 👋</h1>
            <h2>if you don't have an account yet, why don't you make one ?</h2>
            <Link to="/register" className="primary">
              Register
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default LoginForm;
