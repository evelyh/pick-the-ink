import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

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
  let { id } = useParams();

  const [bodyClick, setBodyClick] = React.useState(false);
  const [gallery, setGallery] = useState("/artistgallery/");
  const [profile, setProfile] = useState("/artistprofile/");
  useEffect(()=>{
    if(id== undefined){
      setGallery("/artistgallery/");
      setProfile("/artistprofile/");
    }else{
      setGallery("/artistgallery/" + id);
      setProfile("/artistprofile/" + id);
    }
  },[id])

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
      <Navbar variant="light" expand="lg" id = "NavBar">
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
                    window.location.href=profile;}}>
                  Profile <span className="sr-only">(current)</span>
                </NavLink>
              </NavItem>
              <NavItem id="gallery-but">
                <NavLink href="#pablo"
                onClick={
                    e => {
                      e.preventDefault();
                      window.location.href=gallery;}}>
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