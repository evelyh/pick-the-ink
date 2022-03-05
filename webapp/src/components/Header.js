import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Nav, Container} from 'react-bootstrap'

export class Header extends Component {
  render() {
    return (
      <div className='header'>
          <Navbar bg="light">
            <Container>
            <Navbar.Brand>
                Logo
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Nav>
                    <Nav.Link href="/">Explore</Nav.Link>
                    <Nav.Link href="/managebooking">Manage Booking</Nav.Link>
                    <Nav.Link href="/calendar">Calendar</Nav.Link>
                    <Nav.Link href="/chat">Chat</Nav.Link>
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
