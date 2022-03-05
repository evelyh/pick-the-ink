import React, { Component } from 'react'
import Header from "../components/header";
import NavTabTwo from "../components/NavTabTwo";
import "../assets/css/managebooking.css"
import {Alert, Button, Modal} from "reactstrap";
import PopUpBookingDetails from "../components/PopUpBookingDetails";
import PopUpConfirmBooking from "../components/PopUpConfirmBooking";
import PopUpCancelBooking from "../components/PopUpCancelBooking";

export class ManageBooking extends Component {

  state = {
    userType: 0, // 0 = customer; 1 = artist;
    showBookingDetails: false,
    showConfirmBooking: false,
    bookingConfirmed: false,
    showCancelBooking: false,
    bookingCancelled: false,
  }

  confirmBooking = () => {
    this.setState({
      showConfirmBooking: !this.state.showConfirmBooking,
      bookingConfirmed: true,
    })

    setTimeout(() => {
      this.setState({
        bookingConfirmed: false
      })
    }, 2000)
  }

  cancelBooking = () => {
    this.setState({
      showCancelBooking: !this.state.showCancelBooking,
      bookingCancelled: true,
    })

    setTimeout(() => {
      this.setState({
        bookingCancelled: false
      })
    }, 2000)
  }

  render() {
    return (
      <div>
        <Header/>

        <div className={"body"}>
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
              <th>{ this.state.userType === 0 ? "Customer" : "Artist"}</th>
              <th>Actions</th>
            </tr>
            <tr>
              <td><span className={"month"}>Mar</span><br/><span className={"date"}>22</span></td>
              <td><span className={"cell-details"}>Pending</span></td>
              <td><span className={"cell-details"}>Sailor Moon</span></td>
              <td><i className={"icons nc-icon nc-alert-circle-i"}/>
                <i className={"icons nc-icon nc-settings"}/>
                <i className={"icons nc-icon nc-simple-remove"}/>
              </td>
            </tr>
            <tr>
              <td><span className={"month"}>Mar</span><br/><span className={"date"}>26</span></td>
              <td><span className={"cell-details"}>14:00 - 16:00</span></td>
              <td><span className={"cell-details"}>Tuxedo Mask</span></td>
              <td><i className={"icons nc-icon nc-alert-circle-i"} onClick={() => this.setState({showBookingDetails: true})}/>
                <i className={"icons nc-icon nc-settings"}/>
                <i className={"icons nc-icon nc-check-2"} onClick={() => this.setState({showConfirmBooking: true})}/>
                <i className={"icons nc-icon nc-simple-remove"} onClick={() => this.setState({showCancelBooking: true})}/>
              </td>
            </tr>
          </table>

          <PopUpBookingDetails
            firstName={ "Tuxedo" }
            lastName={ "Mask" }
            email={ "tux.mask@email.com" }
            dob={ "1972-8-3" }
            phone={ "(123) 456-3554" }
            interestedInGetting={ "Custom Design" }
            details={ "Tuxedo La Smoking Bomber!" }
            size={ "5cm x 5cm" }
            referencePic={ "..some pic.." }
            otherDetails={ "n/a" }
            trigger={this.state.showBookingDetails}
            setTrigger={() => this.setState({showBookingDetails: !this.state.showBookingDetails})}
          />

          <PopUpConfirmBooking
            trigger={this.state.showConfirmBooking}
            setTrigger={() => this.setState({showConfirmBooking: !this.state.showConfirmBooking})}
            confirmBooking={this.confirmBooking}
          />

          <Alert color={"success"} isOpen={this.state.bookingConfirmed}>
            Booking confirmed!
          </Alert>

          <PopUpCancelBooking
            trigger={this.state.showCancelBooking}
            setTrigger={() => this.setState({showCancelBooking: !this.state.showCancelBooking})}
            cancelBooking={this.cancelBooking}
          />

          <Alert color={"danger"} isOpen={this.state.bookingCancelled}>
            Booking cancelled!
          </Alert>

        </div>
      </div>
    )
  }
}

export default ManageBooking