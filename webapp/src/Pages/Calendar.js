import { Inject, Day, Week, WorkWeek, Month, Agenda, ScheduleComponent} from '@syncfusion/ej2-react-schedule';
import React, { Component } from 'react'
import Header from 'components/Header';


export class Calendar extends Component {
  render() {
    // Should get this data from the server
    const data = [{
      Id: 1,
      Subject: 'Appointment with spongebob',
      StartTime: new Date(2022, 3, 10, 9, 30),
      EndTime: new Date(2022, 3, 10, 11, 0)
  }, {
      Id: 2,
      Subject: 'Appointment with gary',
      StartTime: new Date(2022, 3, 10, 13, 0),
      EndTime: new Date(2022, 3, 10, 15, 0)
  },{
    Id: 3,
    Subject: 'Appointment with gary',
    StartTime: new Date(2022, 3, 12, 8, 0),
    EndTime: new Date(2022, 3, 12, 10, 0)
}];

    return (
      <div>
        <Header loggedIn={true}></Header>
        <ScheduleComponent selectedDate={new Date(2022, 3, 10)} eventSettings={{ dataSource: data }}>
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    )
  }
}

export default Calendar