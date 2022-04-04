import { Inject, Day, Week, WorkWeek, Month, Agenda, ScheduleComponent, ResourceDirective, ResourcesDirective} from '@syncfusion/ej2-react-schedule';
import React, { Component } from 'react'
import Header from 'components/Header';
import {getTimeslotsByUser} from "../apiHook/calender"
import "../apiHook/calender"
import { getLoginStatus } from 'apiHook/loginSignUp';
import { getUser } from 'apiHook/profile';

export class Calendar extends Component {
  state = {
    userId:'',
    isArtist:false,
    data:[]
  }
  addHoursToDate(date) {
    return new Date(new Date(date).setHours(date.getHours() + 1));
  }
  async componentDidMount(){
    let login = await getLoginStatus();
    this.setState({userId:login.userId, isArtist:login.isArtist})

    let temp = this.state.data;
    if(login.isArtist){
      let result2 = await getTimeslotsByUser({artistID: login.userId, isBooked:true});
    result2 = result2["result"];
    for (const key in result2) {
      
    let et = new Date(result2[key]["startTime"])
    et = new Date(new Date(et).setHours(et.getHours() + 1))
    let customer = await getUser(result[key]["customerID"])
    customer = customer["userName"]
    const appointment = "Appointment with Customer: " + customer
    temp.push(
        {Id:result2[key]["_id"],
        Subject:appointment,
         StartTime: new Date(result2[key]["startTime"]), 
         EndTime: et,
         resourceID: 1
        })
    this.setState({data:temp})
    }
    }
    let result = await getTimeslotsByUser({customerID: login.userId, isBooked:true});
    result = result["result"]
    for (const key in result) {
      
    let et = new Date(result[key]["startTime"])
    et = new Date(new Date(et).setHours(et.getHours() + 1))
    let artist = await getUser(result[key]["artistID"])
    artist = artist["userName"]
    const appointment = "Appointment with Artist: " + artist
    temp.push(
        {Id:result[key]["_id"],
        Subject:appointment,
         StartTime: new Date(result[key]["startTime"]), 
         EndTime: et,
         resourceID: 2
        })
  }
}
  render() {

    const resourceDataSource = [
      {Type:"Appointment with Customer", Id: 1, Color: '#ea7a57'},
      {Type:"Appointment with Artist", Id: 2, Color: '#7fa900'},
    ]    
    return (
      <div>
        <Header loggedIn={true}></Header>
        <ScheduleComponent selectedDate={new Date(2022, 3, 10)} 
        eventSettings={{ dataSource: this.state.data }}>
          <ResourcesDirective>
            <ResourceDirective field='resourceID' title='Type of Appointment' name='Resourses'
            textField='Type' idField='Id' colorField='Color' dataSource={resourceDataSource}></ResourceDirective>
          </ResourcesDirective>
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    )
  }
}

export default Calendar