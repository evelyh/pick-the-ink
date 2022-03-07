import React, { Component } from 'react'
import Header from "../components/Header";
import NavTabTwo from "../components/NavTabTwo";
import "../assets/css/managebooking.css"
import {Alert, Button, Modal} from "reactstrap";
import BookingRow from "../components/BookingRow";
import {uid} from "react-uid";

export class ManageBooking extends Component {

  state = {
    userType: 0, // 0 = artist; 1 = customer;
    bookingConfirmed: false,
    bookingCancelled: false,
    durationSent: false,
    datetimeSent: false,
    pendingBookings: [
      {
        firstName: "Sailor",
        lastName: "Moon",
        email: "champion.of.justice@moon.com",
        dob: "1992-6-30",
        phone: "(645) 634-8235",
        interestedInGetting: "Custom Design",
        details: "On behalf of the moon, I will right wrongs and triumph over evil, and that means you!",
        size: "3cm x 7cm",
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
        firstName: "Tuxedo",
        lastName: "Mask",
        email: "tux.mask@moon.com",
        dob: "1992-6-30",
        phone: "(645) 634-8235",
        interestedInGetting: "Custom Design",
        details: "Tuxedo La Smoking Bomber!",
        size: "3cm x 7cm",
        referencePic: "no pic",
        otherDetails: "n/a",
        bookingMonth: "Mar",
        bookingDate: "26",
        bookingTime: "14:00 - 16:00",
        pendingDuration: false,
        pendingConfirmation: true,
        pendingDateTime: false,
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

        <div className={"managebooking-body"}>
          <h1 className={"page-head"}>Manage Booking</h1>

          <NavTabTwo
            leftLink={"/artist-managebooking"}
            rightLink={"/artist-managebooking-confirm"}
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

export default ManageBooking