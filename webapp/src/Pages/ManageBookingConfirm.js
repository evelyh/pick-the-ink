import React, { Component } from 'react'
import Header from "../components/Header";
import NavTabTwo from "../components/NavTabTwo";
import "../assets/css/managebooking.css"
import BookingRow from "../components/BookingRow";
import {uid} from "react-uid";
import {Alert} from "reactstrap";
import {Navigate} from "react-router-dom";

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
    loggedIn: true,
  }

  removeRow = async (confirmedBooking) => {

    const filteredBookings = this.state.confirmedBookings.filter((booking) => {
      return booking !== confirmedBooking;
    });

    // DELETE request to cancel booking
    const url = this.state.host + "/api/bookings/" + confirmedBooking._id;
    const request = new Request(url, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        credentials: "same-origin",
      },
    });

    await fetch(request)
      .then((res) => {
        if (res.ok) {
          this.setState({
            bookingCancelled: true,
            confirmedBookings: filteredBookings,
          });
          setTimeout(() => {
            this.setState({
              bookingCancelled: false,
            })
          }, 2000);
        } else {
          throw new Error("status not ok");
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          genericError: true,
        });
        setTimeout(() => {
          this.setState({
            genericError: false,
          })
        }, 2000);
      })
  }

  async componentDidMount() {
    // get login status
    let url = this.state.host + "/users/login";
    let request = new Request(url, {
      method: "GET",
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        credentials: 'same-origin',
        "Content-Type": "application/json",
      },
    });

    await fetch(request)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({
          loggedIn: json.loggedIn,
          isArtist: json.isArtist,
          userId: json.user,
        });
      });

    console.log(this.state)

    // get bookings for that user
    url = this.state.host + "/api/bookings";
    const requestBody = this.state.isArtist ? {
      artistID: this.state.userId,
      isConfirmed: true,
    } : {
      customerID: this.state.userId,
      isConfirmed: true,
    };
    console.log(requestBody)

    request = new Request(url, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        Accept: "*/*",
        credentials: "same-origin",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    await fetch(request)
      .then(res => res.json())
      .then(json => {
        console.log("fetch bookings")
        console.log(json)
        this.setState({
          pendingBookings: json,
        })
      });
  }

  checkRedirection = () => {
    console.log("inside checkRedirection: ")
    console.log(this.state.loggedIn);
    if (!this.state.loggedIn){
      return <Navigate to={"/"} />;
    }
  }

  render() {

    return (
      <div>
        {this.checkRedirection()}
        <Header loggedIn={true}/>

        <div className={"managebooking-body"}>
          <h1 className={"page-head"}>Manage Booking</h1>

          <NavTabTwo
            leftLink={"/managebooking"}
            rightLink={"/managebooking-confirm"}
            leftActive={false}
            rightActive={true}
            leftText={"Pending"}
            rightText={"Confirmed"}
          />

            <table id="table">
            <tr>
              <th className={"date-head"}>Date</th>
              <th className={"time-head"}>Time</th>
              <th>{ this.state.isArtist === 0 ? "Customer" : "Artist"}</th>
              <th>Actions</th>
            </tr>

            { this.state.confirmedBookings.map((confirmedBooking) => {
              return(
                <BookingRow
                  key={uid(confirmedBooking)}
                  confirmedBooking={confirmedBooking}
                  isArtist={this.state.isArtist}
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