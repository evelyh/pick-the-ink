import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {Nav, NavItem, NavLink} from "reactstrap";

export class LoginSignupToggle extends Component {
  render() {

    const { isLogin,
            isSignUp } = this.props;

    return (
      <div className="nav-tabs-navigation">
        <div className="nav-tabs-wrapper">
          <Nav tabs>
            <NavItem>
              <NavLink href="/login" active={ isLogin }>Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/signup" active={ isSignUp }>Sign Up</NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>
    )
  }
}

export default LoginSignupToggle