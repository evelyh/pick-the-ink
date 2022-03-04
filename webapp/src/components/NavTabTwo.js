import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {Nav, NavItem, NavLink} from "reactstrap";

export class NavTabTwo extends Component {
  render() {

    const { leftLink,
            rightLink,
            leftActive,
            rightActive,
            leftText,
            rightText } = this.props;

    return (
      <div className="nav-tabs-navigation">
        <div className="nav-tabs-wrapper">
          <Nav tabs>
            <NavItem>
              <NavLink href={ leftLink } active={ leftActive }>{ leftText }</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={ rightLink } active={ rightActive }>{ rightText }</NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>
    )
  }
}

export default NavTabTwo