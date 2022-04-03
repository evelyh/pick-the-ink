import React, { Component } from 'react'
import Header from "../components/Header";
import NavTabTwo from "../components/NavTabTwo";
import "../assets/css/managebooking.css"
import {Alert, Button, Modal} from "reactstrap";
import BookingRow from "../components/BookingRow";
import {uid} from "react-uid";
import {Navigate} from "react-router-dom";
import {getLoginStatus} from "../apiHook/loginSignUp";
import {cancelBooking, getBookings, updateBooking} from "../apiHook/manageBooking";


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

  sendDuration = async (length, pendingBooking) => {

    // PATCH request to update duration of booking
    const requestBody = {
      duration: length,
    };
    const durationUpdated = await updateBooking(pendingBooking._id, requestBody);
    if (durationUpdated){
      this.setState({
        durationSent: true,
      });
      setTimeout(() => {
        this.setState({
          durationSent: false,
        })
      }, 2000);
    } else{
      this.setState({
        genericError: true,
      });
      setTimeout(() => {
        this.setState({
          genericError: false,
        })
      }, 2000);
    }
  }

  removeRow = async (mode, pendingBooking) => {

    const filteredBookings = this.state.pendingBookings.filter((booking) => {
      return booking !== pendingBooking;
    });

    if (mode === "confirm") {
      // patch request to confirm booking
      const requestBody = {
        isConfirmed: true,
      }
      const confirmed = await updateBooking(pendingBooking._id, requestBody);
      if (confirmed){
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
        this.setState({
          genericError: true,
        });
        setTimeout(() => {
          this.setState({
            genericError: false,
          })
        }, 2000);
      }
    } else if (mode === "cancel") {

      const canceled = await cancelBooking(pendingBooking._id);
      if (canceled){
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
        this.setState({
          genericError: true,
        });
        setTimeout(() => {
          this.setState({
            genericError: false,
          })
        }, 2000);

      }
    }
  }

  async componentDidMount() {
    // get login status
    const loginStats = await getLoginStatus();
    this.setState(loginStats);

    // get bookings for that user
    const requestBody = this.state.isArtist ? {
      artistID: this.state.userId,
      isConfirmed: false,
    } : {
      customerID: this.state.userId,
      isConfirmed: false,
    };

    const fetchedBookings = await getBookings(requestBody);
    this.setState({
      pendingBookings: fetchedBookings,
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