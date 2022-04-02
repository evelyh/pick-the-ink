import React, { Component } from 'react'
import Header from "../components/Header";
import NavTabTwo from "../components/NavTabTwo";
import { Navigate } from "react-router-dom";
import {Alert, Button, Input, Label} from "reactstrap";

// styles
import "../assets/css/loginSignUp.css";

export class Login extends Component {

  state = {
    firstName: "",
    lastName: "",
    mail: "",
    phone: "",
    dob: "",
    username: "",
    password: "",
    success: false,
    showPassword: false,
    artist: false,
    host: "http://localhost:5000",
    showFail: false,
    loggedIn: null,
    redirect: false,
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  signUserUp = (event) => {

    event.preventDefault();
    document.getElementById("signup-form").checkValidity();
    document.getElementById("signup-form").reportValidity();

    // todo: connect to backend
    // sign user up with the info given

    const requestBody = {
      userName: this.state.username,
      password: this.state.password,
      email: this.state.mail,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      birthDate: this.state.dob,
      isArtist: this.state.artist,
      phoneNum: this.state.phone,
      artistSub: { // todo: handle file uploads
        license: "something",
        physicalID: "something else",
      }
    };

    console.log(requestBody);

    const url = this.state.host + "/api/users";
    const request = new Request(url, {
      method: "POST",
      credentials: 'same-origin',
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Accept: '*/*',
        credentials: 'same-origin',
      },
    });

    fetch(request).then((res) => {
      console.log(res)
      if (res.ok){
        this.setState({
          success: true,
        });
        setTimeout(() => {
          this.setState({
            success: false,
            redirect: true,
          })
        }, 3000);
      } else{
        // bad request
        this.setState({
          showFail: true,
        });
        setTimeout(() => {
          this.setState({
            showFail: false,
          })
        }, 2000);
      }
    }).catch((error) => {
      console.log(error);
    })

  }

  componentDidMount() {
    if (this.state.loggedIn === null){
      const url = this.state.host + "/users/login";
      const request = new Request(url, {
        method: "GET",
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          credentials: 'same-origin',
          "Content-Type": "application/json",
        },
      });

      fetch(request)
        .then(res => res.json())
        .then(json => {
          console.log(json)
          this.setState({
            loggedIn: json.loggedIn,
          });
        });
    }
  }

  checkRedirection = () => {
    if (this.state.loggedIn){
      return <Navigate to={"/explore"} />;
    } else if (this.state.redirect){
      return <Navigate to={"/login"} />;
    }
  }

  togglePassword = () => {
    this.state.showPassword = !this.state.showPassword;
  }

  render() {
    return (
      <div>
        {this.checkRedirection()}

        <Header loggedIn={false}/>
        <Alert isOpen={this.state.showFail} color={"danger"}>Sign up failed, please check</Alert>
        <Alert isOpen={this.state.success} color={"success"}>Sign up successful! Redirecting you to Login...</Alert>

        <div className={"login-form-container"}>

          <NavTabTwo
            leftLink={"/login"}
            rightLink={"/signup"}
            leftActive={false}
            rightActive={true}
            leftText={"Login"}
            rightText={"Sign Up"}
          />

          <form onSubmit={ this.signUserUp } id={"signup-form"}>
            <div className={"input-container"}>
              <div className={"col-md-6"}>
                <Label for={"firstName"}>First Name</Label>
                <Input type={"text"}
                       placeholder={"First Name"}
                       name={"firstName"}
                       id={"firstName"}
                       value={ this.state.firstName }
                       onChange={ this.handleInputChange }
                       required={true}
                />
              </div>
              <div className={"col-md-6"}>
                <Label for={"lastName"}>Last Name</Label>
                <Input type={"text"}
                       placeholder={"Last Name"}
                       name={"lastName"}
                       id={"lastName"}
                       value={ this.state.lastName }
                       onChange={ this.handleInputChange }
                       required={true}
                />
              </div>

              <div className={"col-md-6"}>
                <Label for={"mail"}>Email</Label>
                <Input value={ this.state.mail }
                       onChange={ this.handleInputChange }
                       type="email"
                       name="mail"
                       id={"mail"}
                       placeholder="example@email.com"
                       required={true}
                />
              </div>

              <div className={"col-md-6"}>
                <Label for={"phone"}>Phone Number</Label>
                <Input value={ this.state.phone }
                       onChange={ this.handleInputChange }
                       type="tel"
                       name="phone"
                       id={"phone"}
                       placeholder="xxx-xxx-xxxx (optional)"
                       pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"}
                />
              </div>

              <Label for={"dob"}>Birthday</Label>
              <Input value={ this.state.dob }
                     onChange={ this.handleInputChange }
                     type="date"
                     name="dob"
                     id={"dob"}
                     required={true}
                     max={ new Date().toISOString().split("T")[0] }
              />

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
              />
              <Button className={"btn-round btn-icon passwordToggle"}
                      onClick={ this.togglePassword }
                      color={"neutral"}
                      size={"sm"}>show</Button>
              <br/>
              Are you signing up for an artist account?<br/>
              <Label for={"artist"}>Yes</Label>
              <Input type={"checkbox"}
                     onChange={this.handleInputChange}
                     name={"artist"}
                     id={"artist"}
                     required={false}
              />
              <br/>
              <span>
                To ensure the safety of clients, we require all our artists to provide us with a piece of ID and license.<br/>
                <em>Collected personal information will be deleted after we confirm you are legit, and only be used for the above stated purpose.</em><br/>
              </span>
              <Label for={"license"}>License: </Label>
              <Input type={"file"}
                     name={"license"}
                     id={"license"}
                     required={this.state.artist}
              />
              <Label for={"id"}>ID: </Label>
              <Input type={"file"}
                     name={"id"}
                     id={"id"}
                     required={this.state.artist}
              />
            </div>

            <div className={"button-container"}>
              <Button type={"submit"} onSubmit={ this.signUserUp } onClick={ this.signUserUp }> Sign Up </Button>
            </div>
          </form>


        </div>


      </div>
    )
  }
}

export default Login