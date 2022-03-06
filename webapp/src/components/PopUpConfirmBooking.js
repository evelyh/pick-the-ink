import React, { Component } from 'react'
import "../assets/css/managebooking.css"
import {Alert, Button, Modal, Nav, NavItem, NavLink} from "reactstrap";

export class PopUpConfirmBooking extends Component {

  state = {
    showAlert: false,
  }

  render() {

    const {
      trigger,
      setTrigger,
      confirmBooking,
    } = this.props;

    return (trigger) ? (
      <div>
          <Modal isOpen={trigger} toggle={setTrigger}>
            <div className={"modal-header"}>
              <h5 className={"modal-title"}>
                Confirm Booking
              </h5>
            </div>
            <div className={"modal-body"}>
              Do you want to finalize this booking?
            </div>
            <div className={"modal-footer"}>
              <Button
                className={"confirmation-button btn-round"}
                color={"default"}
                data-dismiss={"modal"}
                type={"button"}
                onClick={confirmBooking}>
                YES
              </Button>
              <Button
                className={"confirmation-button btn-round"}
                color={"default"}
                data-dismiss={"modal"}
                type={"button"}
                onClick={setTrigger}>
                CANCEL
              </Button>
            </div>
          </Modal>
      </div>
    ) : "";
  }
}

export default PopUpConfirmBooking