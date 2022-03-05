import React, { Component } from 'react'
import "../assets/css/managebooking.css"
import {Alert, Button, Modal, Nav, NavItem, NavLink} from "reactstrap";
import PopUpBookingDetails from "./PopUpBookingDetails";
import PopUpConfirmBooking from "./PopUpConfirmBooking";
import PopUpCancelBooking from "./PopUpCancelBooking";

export class ConfirmedBookingRow extends Component {

  state = {
    showBookingDetails: false,
    showCancelBooking: false,
    bookingCancelled: false,
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

    const {
      confirmedBooking, removeRow
    } = this.props;

    return (
      // <div>
        <tr>
          <td><span className={"month"}>{confirmedBooking.bookingMonth}</span><br/><span className={"date"}>{confirmedBooking.bookingDate}</span></td>
          <td><span className={"cell-details"}>{confirmedBooking.bookingTime}</span></td>
          <td><span className={"cell-details"}>{confirmedBooking.firstName} {confirmedBooking.lastName}</span></td>
          <td><i className={"icons nc-icon nc-alert-circle-i"}/>
            <i className={"icons nc-icon nc-settings"}/>
            <i className={"icons nc-icon nc-simple-remove"}/>
          </td>
          <PopUpBookingDetails
            firstName={ confirmedBooking.firstName }
            lastName={ confirmedBooking.lastName }
            email={ confirmedBooking.email }
            dob={ confirmedBooking.dob }
            phone={ confirmedBooking.phone }
            interestedInGetting={ confirmedBooking.interestedInGetting }
            details={ confirmedBooking.details }
            size={ confirmedBooking.size }
            referencePic={ confirmedBooking.referencePic }
            otherDetails={ confirmedBooking.otherDetails }
            trigger={this.state.showBookingDetails}
            setTrigger={() => this.setState({showBookingDetails: !this.state.showBookingDetails})}
          />

          <PopUpCancelBooking
            trigger={this.state.showCancelBooking}
            setTrigger={() => this.setState({showCancelBooking: !this.state.showCancelBooking})}
            cancelBooking={this.cancelBooking}
          />

          <Alert color={"danger"} isOpen={this.state.bookingCancelled}>
            Booking cancelled!
          </Alert>
        </tr>

        // <PopUpBookingDetails
        //   firstName={ confirmedBooking.firstName }
        //   lastName={ confirmedBooking.lastName }
        //   email={ confirmedBooking.email }
        //   dob={ confirmedBooking.dob }
        //   phone={ confirmedBooking.phone }
        //   interestedInGetting={ confirmedBooking.interestedInGetting }
        //   details={ confirmedBooking.details }
        //   size={ confirmedBooking.size }
        //   referencePic={ confirmedBooking.referencePic }
        //   otherDetails={ confirmedBooking.otherDetails }
        //   trigger={this.state.showBookingDetails}
        //   setTrigger={() => this.setState({showBookingDetails: !this.state.showBookingDetails})}
        // />
        //
        // <PopUpCancelBooking
        //   trigger={this.state.showCancelBooking}
        //   setTrigger={() => this.setState({showCancelBooking: !this.state.showCancelBooking})}
        //   cancelBooking={this.cancelBooking}
        // />
        //
        // <Alert color={"danger"} isOpen={this.state.bookingCancelled}>
        //   Booking cancelled!
        // </Alert>

      // </div>
    );
  }
}

export default ConfirmedBookingRow