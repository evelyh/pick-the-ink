import { Inject, Day, Week, WorkWeek, Month, Agenda, ScheduleComponent} from '@syncfusion/ej2-react-schedule';
import React, { Component } from 'react'
import Header from 'components/Header';


export class Calendar extends Component {
  render() {
    // Should get this data from the server
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

    return (
      <div>
        <Header loggedIn={true}></Header>
        <ScheduleComponent selectedDate={new Date(2022, 3, 10)} 
        eventSettings={{ dataSource: data }}>
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    )
  }
}

export default Calendar