import React from "react";

// reactstrap components
import {
  UncontrolledCollapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  FormGroup,
  Form,
  Input,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";

// core components

function ArtistNavBar(props) {
  const [bodyClick, setBodyClick] = React.useState(false);
  return (
    <>
      {bodyClick ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setBodyClick(false);
          }}
        />
      ) : null}
      <Navbar color="primary" expand="lg" id = "NavBar">
        <Container>
          {/* <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
            Navbar
          </NavbarBrand> */}
          <UncontrolledCollapse navbar toggler="#navbarNav" id="navbar-container">
            <Nav navbar>
              <NavItem id = "profile-but">
                <NavLink href="#pablo" 
                onClick={e => {
                    e.preventDefault();
                    window.location.href='http://localhost:5000/artistprofile';}}>
                  Profile <span className="sr-only">(current)</span>
                </NavLink>
              </NavItem>
              <NavItem id="gallery-but">
                <NavLink href="#pablo"
                onClick={
                    e => {e.preventDefault();
                    window.location.href='http://localhost:5000/artistgallery';}}>
                  Gallery
                </NavLink>
              </NavItem>
            </Nav>
            <button
            className="navbar-toggler"
            id="navbarNav"
            type="button"
            onClick={() => {
              document.documentElement.classList.toggle("nav-open");
              setBodyClick(true);
            }}
          >
            <span className="navbar-toggler-icon" />
          </button>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ArtistNavBar