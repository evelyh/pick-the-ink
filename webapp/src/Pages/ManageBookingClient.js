import React, { Component } from 'react'
import Header from "../components/Header";
import NavTabTwo from "../components/NavTabTwo";
import "../assets/css/managebooking.css"
import {Alert, Button, Modal} from "reactstrap";
import BookingRow from "../components/BookingRow";
import {uid} from "react-uid";

export class ManageBookingClient extends Component {

  state = {
    userType: 1, // 0 = artist; 1 = customer;
    bookingConfirmed: false,
    bookingCancelled: false,
    durationSent: false,
    datetimeSent: false,
    pendingBookings: [
      {
        artistName: "SpongeBob",
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpsonfam.com",
        dob: "1986-5-12",
        phone: "(672) 609-5463",
        interestedInGetting: "Custom Design",
        details: "I am so smart! S-M-R-T!",
        size: "4cm x 8cm",
        referencePic: "no pic",
        otherDetails: "n/a",
        bookingMonth: "",
        bookingDate: "",
        bookingTime: "Pending",
        pendingDuration: true,
        pendingConfirmation: false,
        pendingDateTime: false,
      },
      {
        artistName: "Tuxedo Mask",
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpsonfam.com",
        dob: "1986-5-12",
        phone: "(672) 609-5463",
        interestedInGetting: "Custom Design",
        details: "Tuxedo La Smoking Bomber!",
        size: "3cm x 1cm",
        referencePic: "no pic",
        otherDetails: "n/a",
        bookingMonth: "",
        bookingDate: "",
        bookingTime: "Pending",
        pendingDuration: false,
        pendingConfirmation: false,
        pendingDateTime: true,
        duration: 1,
      }
    ]
  }

  sendDateTime = () => {
    this.setState({
      datetimeSent: true,
    });
    setTimeout(() => {
      this.setState({
        datetimeSent: false,
      })
    }, 2000);
  }

  sendDuration = () => {
    this.setState({
      durationSent: true,
    });
    setTimeout(() => {
      this.setState({
        durationSent: false,
      })
    }, 2000);
  }

  removeRow = (mode, pendingBooking) => {

    const filteredBookings = this.state.pendingBookings.filter((booking) => {
      return booking !== pendingBooking;
    });

    if (mode === "confirm"){
      this.setState({
        bookingConfirmed: true,
        pendingBookings: filteredBookings,
      });
      setTimeout(() => {
        this.setState({
          bookingConfirmed: false,
        })
      }, 2000);
    }
    else if (mode === "cancel"){
      this.setState({
        bookingCancelled: true,
        pendingBookings: filteredBookings,
      });
      setTimeout(() => {
        this.setState({
          bookingCancelled: false,
        })
      }, 2000);
    }
  }

  render() {
    return (
      <div>
        <Header loggedIn={true}/>

        <div className={"body"}>
          <h1 className={"page-head"}>Manage Booking</h1>

          <NavTabTwo
            leftLink={"/managebooking"}
            rightLink={"/managebooking-confirm"}
            leftActive={true}
            rightActive={false}
            leftText={"Pending"}
            rightText={"Confirmed"}
          />

          <table id="table">
            <tr id="tr">
              <th id="th" className={"date-head"}>Date</th>
              <th id="th" className={"time-head"}>Time</th>
              <th id="th" >{ this.state.userType === 0 ? "Customer" : "Artist"}</th>
              <th id="th" >Actions</th>
            </tr>

            { this.state.pendingBookings.map((pendingBooking) => {
              return(
                <BookingRow
                  key={uid(pendingBooking)}
                  confirmedBooking={pendingBooking}
                  userType={this.state.userType}
                  removeRow={(mode) => this.removeRow(mode, pendingBooking)}
                  sendDuration={() => this.sendDuration()}
                  sendDateTime={() => this.sendDateTime()}
                />
              )
            }) }
          </table>

          <Alert color={"success"} isOpen={this.state.bookingConfirmed}>
            Booking confirmed!
          </Alert>

          <Alert color={"danger"} isOpen={this.state.bookingCancelled}>
            Booking cancelled!
          </Alert>

          <Alert color={"success"} isOpen={this.state.durationSent}>
            Duration Sent!
          </Alert>

          <Alert color={"success"} isOpen={this.state.datetimeSent}>
            Date/time sent! Wait for confirmation...
          </Alert>

        </div>
      </div>
    )
  }
}

export default ManageBookingClient