import React, { Component } from 'react'
import Header from "../components/Header";
import NavTabTwo from "../components/NavTabTwo";
import "../assets/css/managebooking.css"
import {Alert, Button, Modal} from "reactstrap";
import BookingRow from "../components/BookingRow";
import {uid} from "react-uid";
import {loginStatus} from "../apiHook/loginSignUp";


export class ManageBooking extends Component {

  state = {
    isArtist: null,
    genericError: false,
    bookingConfirmed: false,
    bookingCancelled: false,
    durationSent: false,
    datetimeSent: false,
    pendingBookings: [
      // phase 1 code
      // {
      //   firstName: "Sailor",
      //   lastName: "Moon",
      //   email: "champion.of.justice@moon.com",
      //   dob: "1992-6-30",
      //   phone: "(645) 634-8235",
      //   interestedInGetting: "Custom Design",
      //   details: "On behalf of the moon, I will right wrongs and triumph over evil, and that means you!",
      //   size: "3cm x 7cm",
      //   referencePic: "no pic",
      //   otherDetails: "n/a",
      //   bookingMonth: "",
      //   bookingDate: "",
      //   bookingTime: "Pending",
      //   pendingDuration: true,
      //   pendingConfirmation: false,
      //   pendingDateTime: false,
      // },
      // {
      //   firstName: "Tuxedo",
      //   lastName: "Mask",
      //   email: "tux.mask@moon.com",
      //   dob: "1992-6-30",
      //   phone: "(645) 634-8235",
      //   interestedInGetting: "Custom Design",
      //   details: "Tuxedo La Smoking Bomber!",
      //   size: "3cm x 7cm",
      //   referencePic: "no pic",
      //   otherDetails: "n/a",
      //   bookingMonth: "Mar",
      //   bookingDate: "26",
      //   bookingTime: "14:00 - 16:00",
      //   pendingDuration: false,
      //   pendingConfirmation: true,
      //   pendingDateTime: false,
      // }
    ],
    host: "http://localhost:5000",
    userId: "",
  }
  // todo: change BookingRow implementation details
  // todo: go through front-end jsx to change details for all front-end code

  // todo: add calendar view to allow users to select timeslots
  // todo: connect to backend
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

  // *******changed in phase 2
  sendDuration = (length, pendingBooking) => {

    // PATCH request to update duration of booking
    const url = this.state.host + "/api/bookings/" + pendingBooking._id;
    const requestBody = {
      duration: length,
    };

    const request = new Request(url, {
      method: "PATCH",
      credentials: "same-origin",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        credentials: "same-origin",
      },
    });

    fetch(request)
      .then((res) => {
        if (res.ok){
          this.setState({
            durationSent: true,
          });
          setTimeout(() => {
            this.setState({
              durationSent: false,
            })
          }, 2000);
        } else{
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

  // ******* changed in phase 2
  removeRow = (mode, pendingBooking) => {

    const filteredBookings = this.state.pendingBookings.filter((booking) => {
      return booking !== pendingBooking;
    });

    if (mode === "confirm"){

      // PATCH request to confirm booking on backend
      const url = this.state.host + "/api/bookings/" + pendingBooking._id;
      const requestBody = {
        isConfirmed: true,
      }

      const request = new Request(url, {
        method: "PATCH",
        credentials: "same-origin",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          credentials: "same-origin",
        },
      });

      fetch(request)
        .then((res) => {
          if (res.ok){
            this.setState({
              bookingConfirmed: true,
              pendingBookings: filteredBookings,
            });
            setTimeout(() => {
              this.setState({
                bookingConfirmed: false,
              })
            }, 2000);
          } else{
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
    else if (mode === "cancel"){

      // DELETE request to cancel booking
      const url = this.state.host + "/api/bookings/" + pendingBooking._id;
      const request = new Request(url, {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          credentials: "same-origin",
        },
      });

      fetch(request)
        .then((res) => {
          if (res.ok){
            this.setState({
              bookingCancelled: true,
              pendingBookings: filteredBookings,
            });
            setTimeout(() => {
              this.setState({
                bookingCancelled: false,
              })
            }, 2000);
          } else{
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
  }

  componentDidMount() {
    // get userType and userId
    const loginStatus = loginStatus();
    this.state.isArtist = loginStatus.isArtist;
    this.state.userId = loginStatus.user;

    // get bookings for that user
    const url = this.state.host + "/api/bookings";
    const requestBody = this.state.isArtist ? {
      artistID: this.state.userId,
      isConfirmed: false,
    } : {
      customerID: this.state.userId,
      isConfirmed: false,
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
          pendingBookings: json,
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
            leftActive={true}
            rightActive={false}
            leftText={"Pending"}
            rightText={"Confirmed"}
          />

          <table>
            <tr>
              <th className={"date-head"}>Date</th>
              <th className={"time-head"}>Time</th>
              <th>{ this.state.isArtist ? "Artist" : "Customer"}</th>
              <th>Actions</th>
            </tr>

            { this.state.pendingBookings.map((pendingBooking) => {
              return(
                <BookingRow
                  key={uid(pendingBooking)}
                  confirmedBooking={pendingBooking}
                  userType={this.state.userType}
                  removeRow={(mode) => this.removeRow(mode, pendingBooking)}
                  sendDuration={(length) => this.sendDuration(length, pendingBooking)} // todo: change in bookingrow
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

          <Alert color={"danger"} isOpen={this.state.genericError}>
            An error occurred, please try again later.
          </Alert>

        </div>
      </div>
    )
  }
}

export default ManageBooking