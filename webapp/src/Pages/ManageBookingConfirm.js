import React, { Component } from 'react'
import Header from "../components/Header";
import NavTabTwo from "../components/NavTabTwo";
import "../assets/css/managebooking.css"
import BookingRow from "../components/BookingRow";
import {uid} from "react-uid";
import {Alert} from "reactstrap";
import {Navigate} from "react-router-dom";
import {cancelBooking, confirmBooking, getBookings, unbookTimeslots} from "../apiHook/manageBooking";
import {getLoginStatus} from "../apiHook/loginSignUp";
import Footer from "../components/Footer";

export class ManageBookingConfirm extends Component {

  state = {
    isArtist: null,
    confirmedBookings: [],
    bookingCancelled: false,
    host: "http://localhost:5000",
    userId: "",
    datetimeSent: false,
    loggedIn: true,
  }

  sendDateTime = async (timeslots, confirmedBooking) => {

    if (confirmedBooking.isConfirmed) {
      const timeslotsUnbooked = await unbookTimeslots(confirmedBooking.timeslots);
      if (timeslotsUnbooked){
        const bookingConfirmed = await confirmBooking(confirmedBooking.customerID, timeslots, confirmedBooking._id);
        if (bookingConfirmed){
          this.setState({
            datetimeSent: true,
          });
          setTimeout(() => {
            this.setState({
              datetimeSent: false,
            })
          }, 2000);
          await this.componentDidMount();
          return true;
        }
      }
    } else{
      alert("Internal server error");
    }
  }

  removeRow = async (confirmedBooking) => {

    const filteredBookings = this.state.confirmedBookings.filter((booking) => {
      return booking !== confirmedBooking;
    });

    // DELETE request to cancel booking
    const bookingCanceled = await cancelBooking(confirmedBooking._id);
    if (bookingCanceled){
      this.setState({
        bookingCancelled: true,
        confirmedBookings: filteredBookings,
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

  async componentDidMount() {
    // get login status
    const loginStats = await getLoginStatus();
    this.setState(loginStats);

    // get bookings for that user
    const requestBody = this.state.isArtist ? {
      artistID: this.state.userId,
      isConfirmed: true,
    } : {
      customerID: this.state.userId,
      isConfirmed: true,
    };
    const fetchedBookings = await getBookings(requestBody);
    this.setState({
      confirmedBookings: fetchedBookings,
    });

  }

  checkRedirection = () => {
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
              <th>{ this.state.isArtist ? "Customer" : "Artist"}</th>
              <th>Actions</th>
            </tr>
            {this.state.confirmedBookings.length > 0 ? null : <tr><td colSpan={4} className={"no-pending-confirm"}> No confirmed bookings </td></tr>}

            { this.state.confirmedBookings.map((confirmedBooking) => {
              return(
                <BookingRow
                  key={uid(confirmedBooking)}
                  confirmedBooking={confirmedBooking}
                  isArtist={this.state.isArtist}
                  removeRow={() => this.removeRow(confirmedBooking)}
                  sendDateTime={(timeslots) => this.sendDateTime(timeslots, confirmedBooking)}
                />
              )
            }) }

          </table>

          <Alert color={"danger"} isOpen={this.state.bookingCancelled}>
            Booking cancelled!
          </Alert>
          <Alert color={"success"} isOpen={this.state.datetimeSent}>
            Booking time modified!
          </Alert>

        </div>
        <Footer/>
      </div>
    )
  }
}

export default ManageBookingConfirm