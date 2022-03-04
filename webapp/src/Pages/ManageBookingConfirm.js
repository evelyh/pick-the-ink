import React, { Component } from 'react'
import Header from "../components/header";
import NavTabTwo from "../components/NavTabTwo";
import "../assets/css/managebooking.css"

export class ManageBookingConfirm extends Component {

  state = {
    userType: 0, // 0 = customer; 1 = artist;
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
              <th>Date</th>
              <th>Time</th>
              <th>{ this.state.userType === 0 ? "Customer" : "Artist"}</th>
            </tr>
            <tr>
              <td>Mar 10</td>
            </tr>
          </table>

        </div>
      </div>
    )
  }
}

export default ManageBookingConfirm