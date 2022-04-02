import React, { Component } from 'react'
import Header from "../components/Header";
import NavTabTwo from "../components/NavTabTwo";
import "../assets/css/managebooking.css"
import BookingRow from "../components/BookingRow";
import {uid} from "react-uid";
import {Alert} from "reactstrap";
import {loginStatus} from "../apiHook/loginSignUp";

export class ManageBookingConfirm extends Component {

  state = {
    isArtist: null,
    confirmedBookings: [
      // phase 1 code
      // {
      //   firstName: "Squidward",
      //   lastName: "Tentacles",
      //   email: "squid@spongebob.com",
      //   dob: "1999-1-1",
      //   phone: "(645) 634-8235",
      //   interestedInGetting: "Custom Design",
      //   details: "SpongeBob!",
      //   size: "2cm x 7cm",
      //   referencePic: "no pic",
      //   otherDetails: "n/a",
      //   bookingMonth: "Mar",
      //   bookingDate: "10",
      //   bookingTime: "15:00 - 18:00",
      //   pendingConfirmation: false,
      //   pendingDuration: false,
      // },
      // {
      //   firstName: "Patrick",
      //   lastName: "Star",
      //   email: "patrick@spongebob.com",
      //   dob: "1999-9-5",
      //   phone: "(649) 624-0890",
      //   interestedInGetting: "Custom Design",
      //   details: "SpongeBob!",
      //   size: "3cm x 8cm",
      //   referencePic: "no pic",
      //   otherDetails: "n/a",
      //   bookingMonth: "Mar",
      //   bookingDate: "12",
      //   bookingTime: "10:00 - 12:00",
      //   pendingConfirmation: false,
      //   pendingDuration: false,
      // }
    ],
    bookingCancelled: false,
    host: "http://localhost:5000",
    userId: "",
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

  componentDidMount() {

    // todo: redirect to home if not logged in

    // get userType and userId
    const loginStatus = loginStatus();
    this.state.isArtist = loginStatus.isArtist;
    this.state.userId = loginStatus.user;

    // get bookings for that user
    const url = this.state.host + "/api/bookings";
    const requestBody = this.state.isArtist ? {
      artistID: this.state.userId,
      isConfirmed: true,
    } : {
      customerID: this.state.userId,
      isConfirmed: true,
    };

    const request = new Request(url, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        Accept: "*/*",
        credentials: "same-origin",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    fetch(request)
      .then(res => res.json())
      .then(json => {
        this.setState({
          confirmedBookings: json,
        })
      });
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
            leftActive={false}
            rightActive={true}
            leftText={"Pending"}
            rightText={"Confirmed"}
          />

            <table id="table">
            <tr>
              <th className={"date-head"}>Date</th>
              <th className={"time-head"}>Time</th>
              <th>{ this.state.userType === 0 ? "Customer" : "Artist"}</th>
              <th>Actions</th>
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

export default ManageBookingConfirm