import React, { Component } from 'react'
import "../assets/css/managebooking.css"
import {Alert, Button, Modal, Nav, NavItem, NavLink} from "reactstrap";

export class PopUpCancelBooking extends Component {

  state = {
    showAlert: false,
  }

  render() {

    const {
      trigger,
      setTrigger,
      cancelBooking,
    } = this.props;

    return (trigger) ? (
      <div>
        <Modal isOpen={trigger} toggle={setTrigger}>
          <div className={"modal-header"}>
            <h5 className={"modal-title"}>
              Cancel Booking
            </h5>
          </div>
          <div className={"modal-body"}>
            Do you want to cancel this booking?
          </div>
          <div className={"modal-footer"}>
            <Button
              className={"confirmation-button btn-round"}
              color={"default"}
              data-dismiss={"modal"}
              type={"button"}
              onClick={cancelBooking}>
              YES
            </Button>
            <Button
              className={"confirmation-button btn-round"}
              color={"default"}
              data-dismiss={"modal"}
              type={"button"}
              onClick={setTrigger}>
              NO
            </Button>
          </div>
        </Modal>
      </div>
    ) : "";
  }
}

export default PopUpCancelBooking