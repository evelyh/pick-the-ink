import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Nav, Container} from 'react-bootstrap'
import {getUser} from "../apiHook/profile";
import  "../assets/css/header.css"
import { getLoginStatus } from 'apiHook/loginSignUp';

export class Header extends Component {

  state = {
    userName: null,
  }
  async componentWillMount(){
    const result = getLoginStatus();
    if(result.loggedIn == false){
      this.setState({"userName" : ""});
    }else{
      const user = getUser(result.userId);
      this.setState({"userName": user.userName});
      console.log(this.state.userName, "this.state.userName");
    }
  }
  render() {

    const loggedIn= this.props.loggedIn;
    const Username= this.props.userName;
    console.log("Header")
    console.log(this.props)

    var isArtist;

    if(this.props.isArtist !== undefined) {
      isArtist = this.props.isArtist;
    }

    return (
      <div className='header'>
          <Navbar id='navbarStyle'>
            <Container>
              {
                loggedIn ?
                  <Navbar.Brand id='brand' href="/explore">
                    PickINK
                  </Navbar.Brand>
                  :
                  <Navbar.Brand id='brand' href="/login">
                    PickINK
                  </Navbar.Brand>
              }
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Nav>
                    {loggedIn ? <Nav.Link id="nav" href="/explore">Explore</Nav.Link> : <Nav.Link id="nav" href="/">Explore</Nav.Link>}
                    {loggedIn ? <Nav.Link id="nav" href="/managebooking">Bookings</Nav.Link>: null}
                    {loggedIn ? <Nav.Link id="nav" href="/calendar">Calendar</Nav.Link> : null}
                    {(loggedIn & isArtist) ? <Nav.Link id="nav" href="/artistprofile">Profile</Nav.Link>:null}
                    {(loggedIn & !isArtist) ? <Nav.Link id="nav" href="/userprofile">Profile</Nav.Link>:null}
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text id="nav">
                {loggedIn ? <span id="nav">Signed in as: <a href="/userprofile" id="nav">{Username}</a> / <a href={"/users/logout"} id="nav">Logout</a> </span> : <span id="nav"><a href={"/login"} id="nav">Login</a> / <a href={"/signup"} id="nav">Sign Up</a> </span>}
              </Navbar.Text>
            </Navbar.Collapse>
            </Container>
          </Navbar>
      </div>
    )
  }
}

export default Header
