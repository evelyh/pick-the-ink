import React, { Component } from 'react'
import "../assets/css/managebooking.css"
import {Alert, Button, Modal, Nav, NavItem, NavLink} from "reactstrap";

export class PopUpBookingDetails extends Component {

  render() {

    const {
      firstName,
      lastName,
      email,
      dob,
      phone,
      interestedInGetting,
      details,
      size,
      referencePic,
      otherDetails,
      trigger,
      setTrigger,
    } = this.props;

    return (trigger) ? (
      <Modal isOpen={trigger} toggle={setTrigger}>
        <div className={"modal-header"}>
          <h5 className={"modal-title"}>
            Booking Details
          </h5>
        </div>
        <div className={"modal-body"}>
          Name: {firstName} {lastName} <br/>
          Email: {email} <br/>
          Date of Birth: {dob} <br/>
          Phone: {phone} <br/>
          Interested in getting: {interestedInGetting} <br/>
          Details: {details} <br/>
          Size: {size} <br/>
          Reference picture: {referencePic} <br/>
          Other details: {otherDetails} <br/>
        </div>
        <div className={"modal-footer"}>
          <Button
            className={"btn-link"}
            color={"default"}
            data-dismiss={"modal"}
            type={"button"}
            onClick={setTrigger}>
            Close
          </Button>
        </div>
      </Modal>
    ) : "";
  }
}

export default PopUpBookingDetails