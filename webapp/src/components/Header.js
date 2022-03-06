import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Nav, Container} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import { useForm} from "react-hook-form";

export class Header extends Component {
  styles={
    color: "black",
    fontSize: "22px",
    textTransform: "none",
  }
  render() {
    return (
      <div className='header'>
          <Navbar bg="light">
            <Container>
            <Navbar.Brand style={this.styles} href="/">
                PickINK
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Nav>
                    <Nav.Link href="/">Explore</Nav.Link>
                    <Nav.Link href="/managebooking">Manage Booking</Nav.Link>
                    <Nav.Link href="/calendar">Calendar</Nav.Link>
                    <Nav.Link href="/userprofile">Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="/userprofile">PatrickYahhh</a>
              </Navbar.Text>
            </Navbar.Collapse>
            </Container>
          </Navbar>
      </div>
    )
  }
}

export default Header
