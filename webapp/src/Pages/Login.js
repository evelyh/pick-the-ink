import React, { Component } from 'react'
import Header from "../components/Header";
import NavTabTwo from "../components/NavTabTwo";
import { Navigate } from "react-router-dom";
import {Alert, Button, Input, Label} from "reactstrap";
import { withCookies } from "react-cookie";
// styles
import "../assets/css/loginSignUp.css";

// const host = "http://localhost:5000";

export class Login extends Component {

  state = {
    username: "",
    password: "",
    invalid: null,
    admin: null,
    forgotPassword: false,
    passwordType: "password",
    showPassword: false,
    host: "http://localhost:5000",
    loggedIn: false,
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

    const requestBody = {
      username: this.state.username,
      password: this.state.password,
    };

    const url = this.state.host + "/users/login";
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetch(request).then((res) => {
      if (res.ok){
        this.setState({
          invalid: false,
        });
      } else{
        // bad request
        this.setState({
          invalid: true,
        });
        setTimeout(() => {
          this.setState({
            invalid: null,
          })
        }, 2000);
      }
    }).catch((error) => {
      console.log(error);
    })

    // phase 1 code
    // const userFound = this.state.username === "user" && this.state.password === "user";
    // const isAdmin = this.state.username === "admin" && this.state.password === "admin";
    // if (userFound){
    //   this.setState({
    //     username: "",
    //     password: "",
    //     valid: true
    //   });
    // } else{
    //   this.setState({
    //     valid: false
    //   })
    // }
    //
    // if (isAdmin){
    //   this.setState({
    //     username: "",
    //     password: "",
    //     admin: true,
    //   })
    // }
  }

  // implement if have enough time
  forgetPassword = () => {
    // if forget password, redirect to page for resetting password
    this.setState({
      forgotPassword: true
    });
  }

  componentDidMount() {
    const url = this.state.host + "/users/login";
    const request = new Request(url, {
      method: "GET",
    });

    fetch(request).then((res) => {
      this.setState({
        loggedIn: res.data.loggedIn,
      })
    })
  }

  checkRedirection = () => {
    if (this.state.admin){
      return <Navigate to={"/admin"}/>;
    }
    else if (this.state.invalid === false || this.state.loggedIn){
      return <Navigate to={"/explore"} />;
    }
    // todo: implement if have time
    if (this.state.forgotPassword){
      // redirect to page for resetting password
      return;
    }
  }

  togglePassword = () => {
    this.state.showPassword = this.state.showPassword !== true;
  }

  render() {
    return (
      <div>
        {this.checkRedirection()}

        <Header loggedIn={false}/>

        <Alert color={"danger"} isOpen={this.state.invalid}> Incorrect username / password. Try again! </Alert>

        <div className={"login-form-container"}>

          <NavTabTwo
            leftLink={"/login"}
            rightLink={"/signup"}
            leftActive={true}
            rightActive={false}
            leftText={"Login"}
            rightText={"Sign Up"}
          />

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
                     type={ this.state.showPassword ? "text" : "password" }
                     name="password"
                     id={"password"}
                     placeholder="Password"
                     required={true}
                     className={"password"}
              />
              <Button className={"btn-round btn-icon passwordToggle"}
                      onClick={ this.togglePassword }
                      color={"neutral"}
                      size={"sm"}>show</Button>
            </div>

            <div className={"button-container"}>
              <Button type={"submit"} onClick={ this.checkCredentials }> Login </Button>
              {/* todo: implement forget password*/}
              {/*<Button onClick={ this.forgetPassword } className="btn-link" size={"sm"}> Forgot Password? </Button>*/}
            </div>
          </form>

        </div>


      </div>
    )
  }
}

export default withCookies(Login)