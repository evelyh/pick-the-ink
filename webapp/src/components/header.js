import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Nav} from 'react-bootstrap'

export class Header extends Component {
  render() {
    return (
      <div className='header'>
          <Navbar bg="light">
            <Navbar.Brand>
                Logo
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Nav>
                    <Nav.Link href="/">Explore</Nav.Link>
                    <Nav.Link href="managebooking">Manage Booking</Nav.Link>
                    <Nav.Link href="chat">Chat</Nav.Link>
                    <Nav.Link href="userprofile">Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
          </Navbar>
      </div>
    )
  }
}

export default Header