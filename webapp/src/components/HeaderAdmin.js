import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Nav, Container} from 'react-bootstrap'

export class HeaderAdmin extends Component {
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
                    <Nav.Link href="/admin">Manage Account</Nav.Link>
                    <Nav.Link href="/admin/managecertificate">Artist Certificate</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="/userprofile">Admin</a>
              </Navbar.Text>
            </Navbar.Collapse>
            </Container>
          </Navbar>
      </div>
    )
  }
}

export default HeaderAdmin
