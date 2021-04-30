import React, { Component } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
class LoginForm extends Component {
  state = {
    account: { email: "", password: "" },
  };
  //creating refs for the forms value
  handleSubmit = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        this.state.account.email,
        this.state.account.password
      )
      .then((userCredential) => {
        const user = userCredential.user;
        this.props.handleLogging(user);
      })
      .catch((error) => console.log(error));
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
  render() {
    const { account } = this.state;
    return (
      <section className="sign">
        <div className="left">
          <div>
            <h1>Hey, Friend! 👋 </h1>
            <h2>Register and start a journey with us.</h2>
            <Link to="/login" className="primary">
              Login
            </Link>
          </div>
        </div>
        <div className="right">
          <h1>Create Account</h1>
          <div>
            <input
              name="email"
              value={account.email}
              onChange={this.handleChange}
              id="email"
              placeholder="email"
              type="text"
              className="form-control"
            />
            <input
              name="password"
              onChange={this.handleChange}
              value={account.password}
              id="password"
              type="password"
              placeholder="password"
              className="form-control"
            />
            <Link
              to="/register"
              className="primary"
              onClick={this.handleSubmit}
            >
              Sign up
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default LoginForm;
