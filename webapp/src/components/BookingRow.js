import React, { Component } from 'react'
import "../assets/css/managebooking.css"
import PopUpBookingDetails from "./PopUpBookingDetails";
import PopUpCancelBooking from "./PopUpCancelBooking";
import PopUpConfirmBooking from "./PopUpConfirmBooking";
import PopUpSendDuration from "./PopUpSendDuration";
import PopUpSendDateTime from "./PopUpSendDateTime";

export class BookingRow extends Component {

  state = {
    showBookingDetails: false,
    showCancelBooking: false,
    showSendDuration: false,
    showConfirmBooking: false,
    showSendDateTime: false,
  }

  sendDateTime = () => {
    this.setState({
      showSendDateTime: !this.state.showSendDateTime,
    });

    this.props.sendDateTime();
  }

  sendDuration = (length) => {
    this.setState({
      showSendDuration: !this.state.showSendDuration,
    });

    this.props.sendDuration(length);
  }

  cancelBooking = () => {
    this.setState({
      showCancelBooking: !this.state.showCancelBooking,
    });

    this.props.removeRow("cancel");
  }

  confirmBooking = () => {
    this.setState({
      showConfirmBooking: !this.state.showConfirmBooking,
    });

    this.props.removeRow("confirm");
  }

  render() {

    const {
      confirmedBooking, userType
    } = this.props;

    return (
      // <div>
        <tr>
          <td><span className={"month"}>{confirmedBooking.bookingMonth}</span><br/><span className={"date"}>{confirmedBooking.bookingDate}</span></td>
          <td><span className={"cell-details"}>{confirmedBooking.bookingTime}</span></td>
          <td><span className={"cell-details"}>{confirmedBooking.artistName ? confirmedBooking.artistName : confirmedBooking.firstName + " " + confirmedBooking.lastName}</span></td>
          <td>
            <i className={"icons nc-icon nc-alert-circle-i"} onClick={() => this.setState({showBookingDetails: true})}/>
            {/*<i className={"icons nc-icon nc-settings"}/> todo: implement booking toggles */}

            {confirmedBooking.pendingDuration && userType === 0 ?
              <i title={"Send Duration Estimate"}
                 className={"icons nc-icon nc-send"}
                 onClick={() => this.setState({showSendDuration: true})}
              /> : null
            }
            {(confirmedBooking.pendingDateTime && userType === 1) || (confirmedBooking.pendingConfirmation) ?
              <i title={"Suggest Date/time"}
                 className={"icons nc-icon nc-calendar-60"}
                 onClick={() => this.setState({showSendDateTime: true})}
              /> : null
            }
            {confirmedBooking.pendingConfirmation && !confirmedBooking.pendingDuration ?
              <i title={"Confirm Booking"}
                 className={"icons nc-icon nc-check-2"}
                 onClick={() => this.setState({showConfirmBooking: true})}
              /> : null
            }
            {userType === 0 || confirmedBooking.pendingDuration ?
              <i title={"Cancel booking"}
                 className={"icons nc-icon nc-simple-remove"}
                 onClick={() => this.setState({showCancelBooking: true})}
              /> : null
            }
          </td>

          <PopUpBookingDetails
            booking={confirmedBooking}
            userType={userType}
            trigger={this.state.showBookingDetails}
            setTrigger={() => this.setState({showBookingDetails: !this.state.showBookingDetails})}
          />

          <PopUpCancelBooking
            trigger={this.state.showCancelBooking}
            setTrigger={() => this.setState({showCancelBooking: !this.state.showCancelBooking})}
            cancelBooking={this.cancelBooking}
          />

          <PopUpConfirmBooking
            trigger={this.state.showConfirmBooking}
            setTrigger={() => this.setState({showConfirmBooking: !this.state.showConfirmBooking})}
            confirmBooking={this.confirmBooking}
          />

          <PopUpSendDuration
            trigger={this.state.showSendDuration}
            setTrigger={() => this.setState({showSendDuration: !this.state.showSendDuration})}
            sendDuration={this.sendDuration}
          />

          <PopUpSendDateTime
            trigger={this.state.showSendDateTime}
            setTrigger={() => this.setState({showSendDateTime: !this.state.showSendDateTime})}
            sendDateTime={this.sendDateTime}
            userType={userType}
          />

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

export default BookingRow