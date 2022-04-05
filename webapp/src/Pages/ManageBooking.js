import React, { Component } from 'react'
import Header from "../components/Header";
import NavTabTwo from "../components/NavTabTwo";
import "../assets/css/managebooking.css"
import {Alert, Button, Modal} from "reactstrap";
import BookingRow from "../components/BookingRow";
import {uid} from "react-uid";
import {Navigate} from "react-router-dom";
import {getLoginStatus} from "../apiHook/loginSignUp";
import {cancelBooking, confirmBooking, getBookings, unbookTimeslots, updateBooking} from "../apiHook/manageBooking";
import Footer from "../components/Footer";
import {getUser} from "../apiHook/profile";


export class ManageBooking extends Component {

  state = {
    // for UI work
    // isArtist: false,
    // genericError: false,
    // bookingConfirmed: false,
    // bookingCancelled: false,
    // durationSent: false,
    // datetimeSent: false,
    // pendingBookings: [],
    // host: "http://localhost:5000",
    // userId: "62465a409c96c2071046af8d",
    // loggedIn: true,
    // confirmedBooking: false,
    isArtist: null,
    genericError: false,
    bookingConfirmed: false,
    bookingCancelled: false,
    durationSent: false,
    datetimeSent: false,
    pendingBookings: [],
    host: "http://localhost:5000",
    userId: "",
    userName: "",
    loggedIn: true,
    confirmedBooking: false,
  }

  sendDateTime = async (timeslots, pendingBooking) => {
    if (pendingBooking.isConfirmed) {
      const timeslotsUnbooked = await unbookTimeslots(timeslots);
      if (timeslotsUnbooked){
        const bookingConfirmed = await confirmBooking(pendingBooking.customerID, timeslots, pendingBooking._id);
        if (bookingConfirmed){
          const filteredBookings = this.state.pendingBookings.filter((booking) => {
            return booking !== pendingBooking;
          });
          this.setState({
            datetimeSent: true,
            pendingBookings: filteredBookings,
          });
          setTimeout(() => {
            this.setState({
              datetimeSent: false,
            })
          }, 2000);
          return true;
        }
      }
    }

    if (!pendingBooking.isConfirmed){
      const bookingConfirmed = await confirmBooking(pendingBooking.customerID, timeslots, pendingBooking._id);
      if (bookingConfirmed){
        this.setState({
          datetimeSent: true,
        });
        setTimeout(() => {
          this.setState({
            datetimeSent: false,
            confirmedBooking: true,
          })
        }, 2000);
        return true;
      }
    }
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

      const canceled = await cancelBooking(pendingBooking);
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
    // comment for UI work
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

    // get userName
    const user = await getUser(this.state.userId);
    this.setState({
      userName: user.userName,
    })

  }

  checkRedirection = () => {
    if (!this.state.loggedIn){
        return <Navigate to={"/"} />;
    }
    if (this.state.confirmedBooking){
      return <Navigate to={"/managebooking-confirm"}/>;
    }
  }

  render() {
    return (
      <div>
        {this.checkRedirection()}

        <Header loggedIn={this.state.loggedIn} userName={this.state.userName} isArtist={this.state.isArtist}/>

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

            {this.state.pendingBookings.length > 0 ? null : <tr><td colSpan={4} className={"no-pending-confirm"}> No Pending bookings </td></tr>}

            { this.state.pendingBookings.map((pendingBooking) => {
              return(
                <BookingRow
                  key={uid(pendingBooking)}
                  confirmedBooking={pendingBooking}
                  isArtist={this.state.isArtist}
                  removeRow={(mode) => this.removeRow(mode, pendingBooking)}
                  sendDuration={(length) => this.sendDuration(length, pendingBooking)}
                  sendDateTime={(timeslots) => this.sendDateTime(timeslots, pendingBooking)}
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
            Booking time set! The booking is now confirmed.
          </Alert>

          <Alert color={"danger"} isOpen={this.state.genericError}>
            An error occurred, please try again later.
          </Alert>

        </div>
        <Footer/>
      </div>
    )
  }
}

export default ManageBooking