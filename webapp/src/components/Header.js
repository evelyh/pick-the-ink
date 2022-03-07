import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Nav, Container} from 'react-bootstrap'


export class Header extends Component {
  brand={
    color: "black",
    fontSize: "22px",
    textTransform: "none",
  }
  bar={
    backgroundColor: "rgb(163, 232, 220)",
  }
  nav={
    fontSize:"18px",
    fontWeight: "normal",
  }
  render() {

    const {loggedIn} = this.props;

    return (
      <div className='header'>
          <Navbar>
            <Container>
            <Navbar.Brand style={this.brand} href="/">
                PickINK
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Nav>
                    <Nav.Link style={this.nav} href="/">Explore</Nav.Link>
                    <Nav.Link style={this.nav} href="/managebooking">Manage Booking</Nav.Link>
                    <Nav.Link style={this.nav} href="/calendar">Calendar</Nav.Link>
                    <Nav.Link style={this.nav} href="/userprofile">Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                {loggedIn ? <span>Signed in as: <a href="/userprofile">PatrickYahhh</a></span> : <span><a href={"/login"}>Login</a> / <a href={"/"}>Sign In</a> </span>}
              </Navbar.Text>
            </Navbar.Collapse>
            </Container>
          </Navbar>
      </div>
    )
  }
}

export default Header
