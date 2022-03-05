import React, { Component } from 'react'
import Header from "../components/header";
import NavTabTwo from "../components/NavTabTwo";
import "../assets/css/managebooking.css"
import {Alert, Button, Modal} from "reactstrap";

export class ManageBooking extends Component {

  state = {
    userType: 0, // 0 = customer; 1 = artist;
    showBookingDetails: false,
    showConfirmBooking: false,
    bookingConfirmed: false,
  }

  render() {
    return (
      <div>
        <Header/>

        <div className={"body"}>
          <NavTabTwo
            leftLink={"/managebooking"}
            rightLink={"/managebooking-confirm"}
            leftActive={true}
            rightActive={false}
            leftText={"Pending"}
            rightText={"Confirmed"}
          />

          <table>
            <tr>
              <th className={"date-head"}>Date</th>
              <th className={"time-head"}>Time</th>
              <th>{ this.state.userType === 0 ? "Customer" : "Artist"}</th>
              <th>Actions</th>
            </tr>
            <tr>
              <td><span className={"month"}>Mar</span><br/><span className={"date"}>22</span></td>
              <td><span className={"cell-details"}>Pending</span></td>
              <td><span className={"cell-details"}>Sailor Moon</span></td>
              <td><i className={"icons nc-icon nc-alert-circle-i"}/>
                <i className={"icons nc-icon nc-settings"}/>
                <i className={"icons nc-icon nc-simple-remove"}/>
              </td>
            </tr>
            <tr>
              <td><span className={"month"}>Mar</span><br/><span className={"date"}>26</span></td>
              <td><span className={"cell-details"}>14:00 - 16:00</span></td>
              <td><span className={"cell-details"}>Tuxedo Mask</span></td>
              <td><i className={"icons nc-icon nc-alert-circle-i"} onClick={() => this.setState({showBookingDetails: true})}/>
                <i className={"icons nc-icon nc-settings"}/>
                <i className={"icons nc-icon nc-check-2"} onClick={() => this.setState({showConfirmBooking: true})}/>
                <i className={"icons nc-icon nc-simple-remove"}/>
              </td>
            </tr>
          </table>

          <Modal isOpen={this.state.showBookingDetails} toggle={() => this.setState({showBookingDetails: false})}>
            <div className={"modal-header"}>
              <h5 className={"modal-title"}>
                Booking Details
              </h5>
            </div>
            <div className={"modal-body"}>
              Name: Tuxedo Mask <br/>
              Email: tux.mask@email.com <br/>
              Date of Birth: 1972-8-3 <br/>
              Phone: (123) 456-3554 <br/>
              Interested in getting: Custom Design <br/>
              Details: I don't know what I want. <br/>
              Size: 5cm x 5cm <br/>
              Reference picture: ////some pic//// <br/>
              Other details: n/a <br/>
            </div>
            <div className={"modal-footer"}>
              <Button
                className={"btn-link"}
                color={"default"}
                data-dismiss={"modal"}
                type={"button"}
                onClick={() => this.setState({showBookingDetails: false})}>
                Close
              </Button>
            </div>
          </Modal>

          <Modal isOpen={this.state.showConfirmBooking} toggle={() => this.setState({showConfirmBooking: false})}>
            <div className={"modal-header"}>
              <h5 className={"modal-title"}>
                Booking Details
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
                onClick={() => this.setState({showConfirmBooking: false, bookingConfirmed: true})}>
                YES
              </Button>
              <Button
                className={"confirmation-button btn-round"}
                color={"default"}
                data-dismiss={"modal"}
                type={"button"}
                onClick={() => this.setState({showConfirmBooking: false})}>
                CANCEL
              </Button>
            </div>
          </Modal>
          <Alert color={"success"} isOpen={this.state.bookingConfirmed}
                 toggle={() => this.setState({bookingConfirmed: false})}>
            Booking confirmed!
          </Alert>

        </div>
      </div>
    )
  }
}

export default ManageBooking