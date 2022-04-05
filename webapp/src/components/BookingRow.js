import React, { Component } from 'react'
import "../assets/css/managebooking.css"
import PopUpBookingDetails from "./PopUpBookingDetails";
import PopUpCancelBooking from "./PopUpCancelBooking";
import PopUpConfirmBooking from "./PopUpConfirmBooking";
import PopUpSendDuration from "./PopUpSendDuration";
import PopUpSendDateTime from "./PopUpSendDateTime";
import {getArtistAvailability, getBookingTimeString, getUserInfo} from "../apiHook/manageBooking";

export class BookingRow extends Component {

  state = {
    showBookingDetails: false,
    showCancelBooking: false,
    showSendDuration: false,
    showConfirmBooking: false,
    showSendDateTime: false,
    host: "http://localhost:5000",
    bookingMonth: null,
    bookingDate: null,
    bookingTimeString: null,
    bookingStartDateObj: new Date(),
    bookingEndDateObj: new Date(),
    artistName: null,
    customerName: null,
    customerEmail: null,
    customerPhone: null,
    sentDuration: false,
  }

  sendDateTime = async (timeslots) => {
    const ok = await this.props.sendDateTime(timeslots);
    if (ok){
      console.log("indide bookingrow, disabling popup")
      this.setState({
        showSendDateTime: !this.state.showSendDateTime,
      });
    }
    return ok;
  }

  sendDuration = (length) => {
    this.setState({
      showSendDuration: !this.state.showSendDuration,
      sentDuration: true,
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

  async componentWillMount() {
    console.log("in booking row, this.props:", this.props)
    // extract date string from timeslot if exist
    const timeslots = this.props.confirmedBooking.timeslots;
    if (timeslots.length > 0){
      console.log("about to fetch for times")
      const timeStrings = await getBookingTimeString(timeslots);
      console.log("timestrings:", timeStrings)
      this.setState(timeStrings);
    }

    // get artist name if customer, get customer name if artist
    console.log("right before fetching artist/customer name, this.props", this.props)
    if (!this.props.isArtist){
      console.log("start fetching artist name, artistID: ", this.props.confirmedBooking.artistID)
      const artistId = this.props.confirmedBooking.artistID;
      const artistName = await getUserInfo("artist", artistId);
      console.log("after fetching artist, ", artistName);
      this.setState(artistName);

    } else{
      console.log("inside else, starting fetch customer name: ", this.props.confirmedBooking.customerID)
      const customerId = this.props.confirmedBooking.customerID;
      const customerInfo = await getUserInfo("customer", customerId);
      this.setState(customerInfo);
    }

  }

  render() {

    const {
      confirmedBooking, isArtist
    } = this.props;

    return (
      // <div>
      <tr>
        <td><span className={"month"}>{this.state.bookingTimeString ? this.state.bookingStartDateObj.toLocaleDateString([], {month: "short"}) : null}</span><br/><span
          className={"date"}>{this.state.bookingTimeString ? this.state.bookingStartDateObj.getDate() : null}</span></td>
        <td><span className={"cell-details"}>{this.state.bookingTimeString ? this.state.bookingTimeString : (isArtist && ((!confirmedBooking.duration) && (!this.state.sentDuration)) ? "Pending duration" : "Pending")}</span></td>
        <td><span className={"cell-details"}>{isArtist ? this.state.customerName : this.state.artistName}</span></td>
        <td>
          <i title={"Booking Details"}
             className={"icons nc-icon nc-alert-circle-i"}
             onClick={() => this.setState({showBookingDetails: true})}
          />
          {/*<i title={"Modify"}*/}
          {/*   className={"icons nc-icon nc-settings"}*/}
          {/*/> todo: implement booking toggles*/}

          {(confirmedBooking.duration === null && isArtist) || (isArtist && (!this.state.bookingTimeString)) ?
            <i title={"Send Duration Estimate"}
               className={"icons nc-icon nc-send"}
               onClick={() => this.setState({showSendDuration: true})}
            /> : null
          }
          {(!confirmedBooking.isConfirmed && !isArtist && confirmedBooking.duration !== null) || (isArtist && confirmedBooking.isConfirmed) || (confirmedBooking.isModifiable) ?
            <i title={"Schedule Session"}
               className={"icons nc-icon nc-calendar-60"}
               onClick={() => this.setState({showSendDateTime: true})}
            /> : null
          }
          {/*for when need manually confirm booking*/}
          {/*{(confirmedBooking.timeslots === null && (!isArtist)) || (!confirmedBooking.isConfirmed) ?*/}
          {/*  <i title={"Suggest Date/time"}*/}
          {/*     className={"icons nc-icon nc-calendar-60"}*/}
          {/*     onClick={() => this.setState({showSendDateTime: true})}*/}
          {/*  /> : null*/}
          {/*}*/}
          {/*no need to manually confirm booking -> when customer book a time the booking is confirmed*/}
          {/*{!confirmedBooking.isConfirmed && confirmedBooking.duration !== null ?*/}
          {/*  <i title={"Confirm Booking"}*/}
          {/*     className={"icons nc-icon nc-check-2"}*/}
          {/*     onClick={() => this.setState({showConfirmBooking: true})}*/}
          {/*  /> : null*/}
          {/*}*/}
          {isArtist || (confirmedBooking.duration !== null && confirmedBooking.timeslots === null)
          || confirmedBooking.isCancellable || confirmedBooking.duration === null ?
            <i title={"Cancel booking"}
               className={"icons nc-icon nc-simple-remove"}
               onClick={() => this.setState({showCancelBooking: true})}
            /> : null
          }
        </td>

        <PopUpBookingDetails
          booking={confirmedBooking}
          isArtist={isArtist}
          bookingTime={this.state.bookingTimeString}
          artistName={this.state.artistName}
          customerName={this.state.customerName}
          customerEmail={this.state.customerEmail}
          customerPhone={this.state.customerPhone}
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
          isArtist={isArtist}
          artistId={confirmedBooking.artistID}
          durationNeeded={confirmedBooking.duration}
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