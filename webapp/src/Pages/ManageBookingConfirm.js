import React, { Component } from 'react'
import Header from "../components/header";
import NavTabTwo from "../components/NavTabTwo";
import "../assets/css/managebooking.css"

export class ManageBookingConfirm extends Component {

  state = {
    userType: 0, // 0 = artist; 1 = customer;

  }

  render() {
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

          <table>
            <tr>
              <th className={"date-head"}>Date</th>
              <th className={"time-head"}>Time</th>
              <th>{ this.state.userType === 0 ? "Customer" : "Artist"}</th>
              <th>Actions</th>
            </tr>
            <tr>
              <td><span className={"month"}>Mar</span><br/><span className={"date"}>10</span></td>
              <td><span className={"cell-details"}>10:00 - 12:00</span></td>
              <td><span className={"cell-details"}>Patrick Star</span></td>
              <td><i className={"icons nc-icon nc-alert-circle-i"}/>
                  <i className={"icons nc-icon nc-settings"}/>
                  <i className={"icons nc-icon nc-simple-remove"}/>
              </td>
            </tr>
            <tr>
              <td><span className={"month"}>Mar</span><br/><span className={"date"}>12</span></td>
              <td><span className={"cell-details"}>15:00 - 18:00</span></td>
              <td><span className={"cell-details"}>Squidward Tentacles</span></td>
              <td><i className={"icons nc-icon nc-alert-circle-i"}/>
                <i className={"icons nc-icon nc-settings"}/>
                <i className={"icons nc-icon nc-simple-remove"}/>
              </td>
            </tr>
          </table>

        </div>
      </div>
    )
  }
}

export default ManageBookingConfirm