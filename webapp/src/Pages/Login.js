import React, { Component } from 'react'
import Header from "../components/header";
import LoginSignupToggle from "../components/LoginSignupToggle";
import { Navigate } from "react-router-dom";
import {Alert, Button, Input, Label} from "reactstrap";
// styles
import "../assets/css/loginSignUp.css";

export class Login extends Component {

  state = {
    username: "",
    password: "",
    valid: null,
    forgotPassword: false,
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  checkCredentials = (event) => {

    event.preventDefault();

    // connect to backend api to confirm login
    // if return true (credentials match), then redirect to "some page"
    // by setting valid = true

    const userFound = this.state.username === "user" && this.state.password === "user";
    if (userFound){
      this.setState({
        username: "",
        password: "",
        valid: true
      });
    } else{
      this.setState({
        valid: false
      })
    }
  }

  forgetPassword = () => {
    // if forget password, redirect to page for resetting password
    this.setState({
      forgotPassword: true
    });
  }

  checkRedirection = () => {
    if (this.state.valid){
      return <Navigate to={"/"} />;
    } else if (this.state.valid != null){
      return <Alert color={"danger"}> Incorrect username / password. Try again! </Alert>;
    }
    if (this.state.forgotPassword){
      // redirect to page for resetting password
      return;
    }
  }

  render() {
    return (
      <div>
        {this.checkRedirection()}

        <Header />

        <div className={"login-form-container"}>

          <LoginSignupToggle isLogin={true} isSignUp={false} />

          <form onSubmit={ this.checkCredentials }>
            <div className={"input-container"}>
              <Label for={"username"}>Username</Label>
              <Input value={ this.state.username }
                     onChange={ this.handleInputChange }
                     type="text"
                     name="username"
                     id={"username"}
                     placeholder="Username"
                     required={true}
              />
              <Label for={"password"}>Password</Label>
              <Input value={ this.state.password }
                     onChange={ this.handleInputChange }
                     type="password"
                     name="password"
                     id={"password"}
                     placeholder="Password"
                     required={true}
              />
            </div>

            <div className={"button-container"}>
              <Button type={"submit"} onClick={ this.checkCredentials }> Login </Button>
              <Button onClick={ this.forgetPassword } className="btn-link" size={"sm"}> Forgot Password? </Button>
            </div>
          </form>

        </div>


      </div>
    )
  }
}

export default Login