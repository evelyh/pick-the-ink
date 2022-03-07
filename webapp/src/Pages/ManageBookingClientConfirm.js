import React, { Component } from 'react'
import Header from "../components/Header";
import NavTabTwo from "../components/NavTabTwo";
import "../assets/css/managebooking.css"
import BookingRow from "../components/BookingRow";
import {uid} from "react-uid";
import {Alert} from "reactstrap";

export class ManageBookingClientConfirm extends Component {

  state = {
    userType: 1, // 0 = artist; 1 = customer;
    confirmedBookings: [
      {
        artistName: "Peter Griffin",
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpsonfam.com",
        dob: "1986-5-12",
        phone: "(672) 609-5463",
        interestedInGetting: "Custom Design",
        details: "SpongeBob!",
        size: "2cm x 5cm",
        referencePic: "no pic",
        otherDetails: "n/a",
        bookingMonth: "Mar",
        bookingDate: "10",
        bookingTime: "15:00 - 18:00",
        pendingConfirmation: false,
        pendingDuration: false,
      }
    ],
    bookingCancelled: false,
  }

  removeRow = (confirmedBooking) => {

    const filteredBookings = this.state.confirmedBookings.filter((booking) => {
      return booking !== confirmedBooking;
    });

    this.setState({
      bookingCancelled: true,
      confirmedBookings: filteredBookings,
    });

    setTimeout(() => {
      this.setState({
        bookingCancelled: false
      })
    }, 2000);
  }

  render() {

    return (
      <div>
        <Header/>

        <div className={"body"}>
          <h1 className={"page-head"}>Manage Booking</h1>

          <NavTabTwo
            leftLink={"/client-managebooking"}
            rightLink={"/client-managebooking-confirm"}
            leftActive={false}
            rightActive={true}
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

            { this.state.confirmedBookings.map((confirmedBooking) => {
              return(
                <BookingRow
                  key={uid(confirmedBooking)}
                  confirmedBooking={confirmedBooking}
                  userType={this.state.userType}
                  removeRow={() => this.removeRow(confirmedBooking)}
                />
              )
            }) }

          </table>

          <Alert color={"danger"} isOpen={this.state.bookingCancelled}>
            Booking cancelled!
          </Alert>

        </div>
      </div>
    )
  }
}

export default ManageBookingClientConfirm