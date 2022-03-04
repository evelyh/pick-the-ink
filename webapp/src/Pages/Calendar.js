import { Inject, Day, Week, WorkWeek, Month, Agenda, ScheduleComponent } from '@syncfusion/ej2-react-schedule';
import React, { Component } from 'react'
import Header from 'components/header';


export class Calendar extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <ScheduleComponent>
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    )
  }
}

export default Calendar