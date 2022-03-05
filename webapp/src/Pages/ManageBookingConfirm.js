import React, { Component } from 'react'
import Header from "../components/header";
import NavTabTwo from "../components/NavTabTwo";
import "../assets/css/managebooking.css"
import ConfirmedBookingTable from "../components/ConfirmedBookingTable";

export class ManageBookingConfirm extends Component {

  state = {
    userType: 0, // 0 = artist; 1 = customer;
    confirmedBookings: [
      {
        firstName: "Squidward",
        lastName: "Tentacles",
        email: "squid@spongebob.com",
        dob: "1999-1-1",
        phone: "(645) 634-8235",
        interestedInGetting: "Custom Design",
        details: "SpongeBob!",
        size: "2cm x 7cm",
        referencePic: "no pic",
        otherDetails: "n/a",
        bookingMonth: "Mar",
        bookingDate: "10",
        bookingTime: "15:00 - 18:00",
      },
      {
        firstName: "Patrick",
        lastName: "Star",
        email: "patrick@spongebob.com",
        dob: "1999-9-5",
        phone: "(649) 624-0890",
        interestedInGetting: "Custom Design",
        details: "SpongeBob!",
        size: "3cm x 8cm",
        referencePic: "no pic",
        otherDetails: "n/a",
        bookingMonth: "Mar",
        bookingDate: "12",
        bookingTime: "10:00 - 12:00",
      }
    ]
  }

  removeRow = () => {
    console.log("here");
  }

  render() {

    console.log("page")
    console.log(this.state.confirmedBookings);

    return (
      <div>
        <Header/>

        <div className={"body"}>
          <NavTabTwo
            leftLink={"/managebooking"}
            rightLink={"/managebooking-confirm"}
            leftActive={false}
            rightActive={true}
            leftText={"Pending"}
            rightText={"Confirmed"}
          />

          {/*<table>*/}
          {/*  <tr>*/}
          {/*    <th className={"date-head"}>Date</th>*/}
          {/*    <th className={"time-head"}>Time</th>*/}
          {/*    <th>{ this.state.userType === 0 ? "Customer" : "Artist"}</th>*/}
          {/*    <th>Actions</th>*/}
          {/*  </tr>*/}
          {/*  <tr>*/}
          {/*    <td><span className={"month"}>Mar</span><br/><span className={"date"}>10</span></td>*/}
          {/*    <td><span className={"cell-details"}>10:00 - 12:00</span></td>*/}
          {/*    <td><span className={"cell-details"}>Patrick Star</span></td>*/}
          {/*    <td><i className={"icons nc-icon nc-alert-circle-i"}/>*/}
          {/*        <i className={"icons nc-icon nc-settings"}/>*/}
          {/*        <i className={"icons nc-icon nc-simple-remove"}/>*/}
          {/*    </td>*/}
          {/*  </tr>*/}
          {/*  <tr>*/}
          {/*    <td><span className={"month"}>Mar</span><br/><span className={"date"}>12</span></td>*/}
          {/*    <td><span className={"cell-details"}>15:00 - 18:00</span></td>*/}
          {/*    <td><span className={"cell-details"}>Squidward Tentacles</span></td>*/}
          {/*    <td><i className={"icons nc-icon nc-alert-circle-i"}/>*/}
          {/*      <i className={"icons nc-icon nc-settings"}/>*/}
          {/*      <i className={"icons nc-icon nc-simple-remove"}/>*/}
          {/*    </td>*/}
          {/*  </tr>*/}
          {/*</table>*/}

          <ConfirmedBookingTable
            confirmedBookings={this.state.confirmedBookings}
            removeRow={this.removeRow}
          />

        </div>
      </div>
    )
  }
}

export default ManageBookingConfirm