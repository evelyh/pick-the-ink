import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar} from 'react-bootstrap'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'

export class header extends Component {
  render() {
    return (
      <div className='header'>
          <Navbar bg="light">
            <Navbar.Brand>
                Logo
            </Navbar.Brand>
            <NavbarToggle/>
            <NavbarCollapse>
                <Nav>
                    <NavLink href="explore">Explore</NavLink>
                    <NavLink href="explore">Manage Booking</NavLink>
                    <NavLink href="explore">Chat</NavLink>
                    <NavLink href="explore">Profile</NavLink>
                </Nav>
            </NavbarCollapse>
          </Navbar>
      </div>
    )
  }
}

export default header