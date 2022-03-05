import React, { Component } from 'react'
import "../assets/css/managebooking.css"
import {Alert, Button, Modal, Nav, NavItem, NavLink} from "reactstrap";

export class PopUpBookingDetails extends Component {

  render() {

    const {
      booking,
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
          Name: {booking.firstName} {booking.lastName} <br/>
          Email: {booking.email} <br/>
          Date of Birth: {booking.dob} <br/>
          Phone: {booking.phone} <br/>
          Interested in getting: {booking.interestedInGetting} <br/>
          Details: {booking.details} <br/>
          Size: {booking.size} <br/>
          Reference picture: {booking.referencePic} <br/>
          Other details: {booking.otherDetails} <br/>
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