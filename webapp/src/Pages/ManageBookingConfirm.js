import React, { Component } from 'react'
import Header from "../components/Header";
import NavTabTwo from "../components/NavTabTwo";
import "../assets/css/managebooking.css"
import BookingRow from "../components/BookingRow";
import {uid} from "react-uid";
import {Alert} from "reactstrap";
import {Navigate} from "react-router-dom";
import {cancelBooking, getBookings} from "../apiHook/manageBooking";
import {getLoginStatus} from "../apiHook/loginSignUp";

export class ManageBookingConfirm extends Component {

  state = {
    isArtist: null,
    confirmedBookings: [],
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
    console.log("inside checkRedirection: ", this.state.loggedIn)
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