import React, { Component } from 'react'
import "../assets/css/managebooking.css"
import {uid} from "react-uid"
import {Alert, Button, Modal, Nav, NavItem, NavLink} from "reactstrap";
import PopUpBookingDetails from "./PopUpBookingDetails";
import PopUpConfirmBooking from "./PopUpConfirmBooking";
import PopUpCancelBooking from "./PopUpCancelBooking";

export class ConfirmedBookingRow extends Component {

  state = {

  }

  render() {

    const {
      confirmedBookings, removeRow
    } = this.props;

    console.log("another")
    console.log(this.props.confirmedBookings)

    return (
      <div>
        <table>
          <tr>
            <th className={"date-head"}>Date</th>
            <th className={"time-head"}>Time</th>
            <th>{ this.state.userType === 0 ? "Customer" : "Artist"}</th>
            <th>Actions</th>
          </tr>
          {/*{ confirmedBookings.map((confirmedBooking) => {*/}
          {/*  return(*/}
          {/*    <ConfirmedBookingRow*/}
          {/*      key={uid(confirmedBooking)}*/}
          {/*      confirmedBooking={confirmedBooking}*/}
          {/*      removeRow={removeRow}*/}
          {/*    />*/}
          {/*  )*/}
          {/*}) }*/}

          <ConfirmedBookingRow
                // key={uid(confirmedBooking)}
                confirmedBooking={confirmedBookings[0]}
                removeRow={removeRow}
          />

        </table>
      </div>
    );
  }
}

export default ConfirmedBookingRow