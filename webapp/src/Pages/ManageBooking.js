import React, { Component } from 'react'
import Header from "../components/Header";
import NavTabTwo from "../components/NavTabTwo";
import "../assets/css/managebooking.css"
import {Alert, Button, Modal} from "reactstrap";
import BookingRow from "../components/BookingRow";
import {uid} from "react-uid";
import {Navigate} from "react-router-dom";


export class ManageBooking extends Component {

  state = {
    isArtist: null,
    genericError: false,
    bookingConfirmed: false,
    bookingCancelled: false,
    durationSent: false,
    datetimeSent: false,
    pendingBookings: [],
    host: "http://localhost:5000",
    userId: "",
    loggedIn: true,
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
  sendDuration = async (length, pendingBooking) => {

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

    await fetch(request)
      .then((res) => {
        if (res.ok) {
          this.setState({
            durationSent: true,
          });
          setTimeout(() => {
            this.setState({
              durationSent: false,
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

  // ******* changed in phase 2
  removeRow = async (mode, pendingBooking) => {

    const filteredBookings = this.state.pendingBookings.filter((booking) => {
      return booking !== pendingBooking;
    });

    if (mode === "confirm") {

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

      await fetch(request)
        .then((res) => {
          if (res.ok) {
            this.setState({
              bookingConfirmed: true,
              pendingBookings: filteredBookings,
            });
            setTimeout(() => {
              this.setState({
                bookingConfirmed: false,
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
    } else if (mode === "cancel") {

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

      await fetch(request)
        .then((res) => {
          if (res.ok) {
            this.setState({
              bookingCancelled: true,
              pendingBookings: filteredBookings,
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
        console.log("managebooking login status")
        console.log(json)
        this.setState({
          loggedIn: json.loggedIn,
          isArtist: json.isArtist,
          userId: json.user,
        });
      });

    // this.state.loggedIn = status.loggedIn;
    // console.log(status)
    // this.state.isArtist = status.isArtist;
    // this.state.userId = status.user;

    // get bookings for that user
    url = this.state.host + "/api/get-bookings";
    const requestBody = this.state.isArtist ? {
      artistID: this.state.userId,
      isConfirmed: false,
    } : {
      customerID: this.state.userId,
      isConfirmed: false,
    };

    request = new Request(url, {
      method: "POST",
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
        console.log("fetch bookings", json)
        this.setState({
          pendingBookings: json.isConfirmedBooking,
        })
      });

    console.log("this.state in managebooking after fetch: ", this.state)
  }

  checkRedirection = () => {
    console.log("inside checkRedirection: ", "logged in: ", this.state.loggedIn)
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
            leftActive={true}
            rightActive={false}
            leftText={"Pending"}
            rightText={"Confirmed"}
          />

          <table>
            <tr>
              <th className={"date-head"}>Date</th>
              <th className={"time-head"}>Time</th>
              <th>{ this.state.isArtist ? "Customer" : "Artist"}</th>
              <th>Actions</th>
            </tr>

            { this.state.pendingBookings.map((pendingBooking) => {
              return(
                <BookingRow
                  key={uid(pendingBooking)}
                  confirmedBooking={pendingBooking}
                  isArtist={this.state.isArtist}
                  removeRow={(mode) => this.removeRow(mode, pendingBooking)}
                  sendDuration={(length) => this.sendDuration(length, pendingBooking)}
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