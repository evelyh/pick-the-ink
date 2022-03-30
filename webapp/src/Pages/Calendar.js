import { Inject, Day, Week, WorkWeek, Month, Agenda, ScheduleComponent, ResourceDirective, ResourcesDirective} from '@syncfusion/ej2-react-schedule';
import React, { Component } from 'react'
import Header from 'components/Header';
import {getTimeslotsByArtist} from "../apiHook/calender"
import "../apiHook/calender"

export class Calendar extends Component {
  render() {
    // Should get this data from the server
    function addHoursToDate(date) {
      return new Date(new Date(date).setHours(date.getHours() + 1));
    }

    let artistData= []
    async function getArtistCalender(artistID){
      let result = await getTimeslotsByArtist("623f584add0f9e13c36ad5a3");
      result = result["result"];
      for (const key in result) {
        
        let et = new Date(result[key]["startTime"])
        et = addHoursToDate(et)
        artistData.push(
          {Id:result[key]["_id"],
           StartTime: new Date(result[key]["startTime"]), 
           EndTime: et,
           resourceID: 1
          })
      }
    }
    console.log(artistData)
    getArtistCalender("623f584add0f9e13c36ad5a3")
    const data = [{
      Id: 1,
      Subject: 'Appointment with Spongebob',
      StartTime: new Date(2022, 3, 10, 9, 30),
      EndTime: new Date(2022, 3, 10, 11, 0)
  }, {
      Id: 2,
      Subject: 'Appointment with Gary',
      StartTime: new Date(2022, 3, 15, 13, 0),
      EndTime: new Date(2022, 3, 15, 15, 0)
  },{
    Id: 3,
    Subject: 'Appointment with Peter Griffin',
    StartTime: new Date(2022, 3, 10, 15, 0),
    EndTime: new Date(2022, 3, 10, 18, 0)
}];

    const resourceDataSource = [
      {Type:"Appointment with Customer", Id: 1, Color: '#ea7a57'},
      {Type:"Appointment with Artist", Id: 2, Color: '#7fa900'},
    ]    
    return (
      <div>
        <Header loggedIn={true}></Header>
        <ScheduleComponent selectedDate={new Date(2022, 3, 10)} 
        eventSettings={{ dataSource: artistData }}>
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