import React, { Component } from 'react'
import "../assets/css/managebooking.css"
import {Button, Input, Modal} from "reactstrap";

export class PopUpSendDuration extends Component {

  state = {
    showAlert: false,
    duration: 0,
  }

  render() {

    const {
      trigger,
      setTrigger,
      sendDuration,
    } = this.props;

    return (trigger) ? (
      <div>
        <Modal isOpen={trigger} toggle={setTrigger}>
          <div className={"modal-header"}>
            <h5 className={"modal-title"}>
              Session Duration
            </h5>
          </div>
          <div className={"modal-body"}>
            How long of a session will the client need to book?<br/>
            You can send an estimate for multiple times, only the last time will be recorded.
            <Input
              type={"number"}
              value={this.state.duration}
              onChange={(event) => this.setState({duration: event.target.value})}
              min={0}
            />
          </div>
          <div className={"modal-footer"}>
            <Button
              className={"confirmation-button btn-round"}
              color={"default"}
              data-dismiss={"modal"}
              type={"button"}
              onClick={sendDuration}>
              SEND
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

export default PopUpSendDuration