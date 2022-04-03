import React, { Component } from 'react'
import "../assets/css/managebooking.css"
import {Alert, Button, Modal, Nav, NavItem, NavLink} from "reactstrap";

export class PopUpBookingDetails extends Component {

  state = {
    flashLink: null,
    referencePic: null,
    host: "http://localhost:5000",
  }

  async componentDidMount() {
    console.log("inside booking details, before fetching this.props: ", this.props)

    if (this.props.booking.flashLink){
      // get flash link
      const flashUrl = this.state.host + "/api/images/" + this.props.booking.flashLink;
      const flashRequest = new Request(flashUrl, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          Accept: "*/*",
        }
      });

      await fetch(flashRequest)
        .then(res => res.json())
        .then(json => {
          console.log("flashlink fetch json", json)
          this.setState({
            flashLink: json.images.img,
          })
        })
        .catch((error) => {
          console.log("fetch flashLink error, ", error)
        })
    }

    if (this.props.booking.otherLink){
      // get reference image
      const referenceUrl = this.state.host + "/api/images/" + this.props.booking.otherLink;
      const referenceRequest = new Request(referenceUrl, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          Accept: "*/*",
        }
      });

      await fetch(referenceRequest)
        .then(res => res.json())
        .then(json => {
          console.log("reference fetch json", json)
          this.setState({
            referencePic: json.images.img,
          })
        })
        .catch((error) => {
          console.log("fetch reference error, ", error)
        })
    }
  }

  render() {

    const {
      booking,
      trigger,
      setTrigger,
      isArtist,
      bookingTime,
      artistName,
      customerName,
      customerEmail,
      customerPhone,
    } = this.props;

    return (trigger) ? (
      <Modal isOpen={trigger} toggle={setTrigger}>
        <div className={"modal-header"}>
          <h5 className={"modal-title"}>
            Booking Details
          </h5>
        </div>
        <div className={"modal-body"}>
          <h4>{(!isArtist) ? `Information sent to ${artistName}:` : "Client information:"}</h4> <br/>
          {(isArtist) ? "Name: " + customerName : "" } {isArtist ? <br/> : null}
          {(isArtist) ? "Email: " + customerEmail : "" } {isArtist ? <br/> : null}
          {(isArtist && customerPhone) ? "Phone: " + customerPhone + <br/> : "" } {isArtist && customerPhone ? <br/> : null}
          Interested in getting: {booking.choice} <br/>
          {booking.choice.toLowerCase() === "flash" ? "" : "Custom design idea: " + (booking.customIdea ? booking.customIdea : "n/a")} {booking.choice.toLowerCase() === "flash" ? null : <br/>}
          {booking.choice.toLowerCase() === "flash" && booking.flashLink ? <img className={"modal-image"} src={this.state.flashLink} alt={"Flash design"}/> : ""}
          {booking.size ? "Size: " + booking.size : "Size: n/a"} <br/>
          {booking.otherLink ? "Reference picture:" : null} {booking.otherLink ? <br/> : null} {booking.otherLink ? <img src={this.state.referencePic} alt={"Reference Picture"} /> : ""} {booking.otherLink ? <br/> : null}
          {booking.concerns ? "Other details / Concerns: " + booking.concerns : ""} {booking.concerns ? <br/> : null}
          {booking.pendingDateTime ? <span className={"duration-needed"}>Duration needed: {booking.duration}</span> : (isArtist ? <span className={"duration-needed"}>Pending duration, please send duration needed</span> : "Duration needed: Pending confirmation from artist")}
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