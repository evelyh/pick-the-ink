import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Nav, Container} from 'react-bootstrap'

export class HeaderAdmin extends Component {
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
                    <Nav.Link href="/admin">ManagementDashboard</Nav.Link>
                    <Nav.Link href="/">UserView</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <a>Signed in as: Admin</a>
              </Navbar.Text>
            </Navbar.Collapse>
            </Container>
          </Navbar>
      </div>
    )
  }
}

export default HeaderAdmin
