import React, { Component } from 'react'
import "../assets/css/managebooking.css"
import {Button, Input, Label, Modal} from "reactstrap";

export class PopUpSendDateTime extends Component {

  state = {
    showAlert: false,
    startTime: "",
    duration: 0,
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  render() {

    const {
      trigger,
      setTrigger,
      sendDateTime,
    } = this.props;

    return (trigger) ? (
      <div>
        <Modal isOpen={trigger} toggle={setTrigger}>
          <div className={"modal-header"}>
            <h5 className={"modal-title"}>
              Suggest/Alternate a date/time
            </h5>
          </div>
          <div className={"modal-body"}>
            Pick a/an suitable/alternate datetime for this appointment<br/>
            You can send selected datetime multiple times, only the last time will be recorded.

            <Label for={"start-time"}>Start Time</Label>
            <Input
              id={"start-time"}
              type={"datetime-local"}
              name={"startTime"}
              value={this.state.startTime}
              onChange={this.handleInputChange}
              required={true}
            />
            <Label for={"duration"}>Duration</Label>
            <Input
              id={"duration"}
              name={"duration"}
              type={"number"}
              value={this.state.duration}
              onChange={this.handleInputChange}
              required={true}
              min={1}
            />
          </div>

          <div className={"modal-footer"}>
            <Button
              className={"confirmation-button btn-round"}
              color={"default"}
              data-dismiss={"modal"}
              type={"submit"}
              onClick={sendDateTime}
              onSubmit={sendDateTime}
            >
              SEND
            </Button>
            <Button
              className={"confirmation-button btn-round"}
              color={"default"}
              data-dismiss={"modal"}
              type={"button"}
              onClick={setTrigger}
            >
              CANCEL
            </Button>
          </div>
        </Modal>
      </div>
    ) : "";
  }
}

export default PopUpSendDateTime