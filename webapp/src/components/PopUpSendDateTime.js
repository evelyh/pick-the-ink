import React, {Component} from 'react'
import "../assets/css/managebooking.css"
import {Button, Input, Label, Modal} from "reactstrap";
import {getArtistAvailability} from "../apiHook/manageBooking";

export class PopUpSendDateTime extends Component {

  state = {
    showAlert: false,
    timeslots: [],
    selectedTimeStrings: [],
    timeslotsNeeded: 0,
    artistLocations: [],
    artistAvailabilityAtLocation: {},
    currentDisplayLocation: "",
    currDisplayDate: new Date(),
  }

  prevWeek = () => {
    const lastWeek = new Date(this.state.currDisplayDate.toString());
    lastWeek.setDate(this.state.currDisplayDate.getDate() - 7);
    console.log("prevWeek", lastWeek)
    this.setState({
      currDisplayDate: lastWeek,
    })
    console.log("prevWeek, ", this.state)
  }

  nextWeek = () => {
    const nextWeek = new Date(this.state.currDisplayDate.toString());
    nextWeek.setDate(this.state.currDisplayDate.getDate() + 7);
    this.setState({
      currDisplayDate: nextWeek,
    })
  }

  handleChangeLocation = (event) => {
    this.setState({
      currentDisplayLocation: event.target.value,
      selectedTimeStrings: [],
      timeslots: [],
      currDisplayDate: new Date(this.state.artistAvailabilityAtLocation[event.target.value][0][0].startTime)
    })
  }

  removeSelected = (event) => {
    const index = this.state.timeslots.indexOf(event.target.id);
    this.setState(prevState => {
      const timeslotsCopy = [...prevState.timeslots];
      const selectedTimeStringsCopy = [...prevState.selectedTimeStrings];
      timeslotsCopy.splice(index, 1);
      selectedTimeStringsCopy.splice(index, 1);
      return {
        timeslots: timeslotsCopy,
        selectedTimeStrings: selectedTimeStringsCopy
      }
    })
  }

  selectTimeslot = (event) => {
    event.target.disabled = true;

    // push selected timeslot id and timestring to this.state
    this.setState(prevState => ({
      timeslots: [...prevState.timeslots, event.target.id],
      selectedTimeStrings: [...prevState.selectedTimeStrings, event.target.value],
    }))
  }

  getDateString = (targetDate) => {
    const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    console.log(targetDate)
    return <span className={"timeslot-picker-header"}>{targetDate.getMonth() + 1}/{targetDate.getDate()}<br/>({daysOfTheWeek[targetDate.getDay()]})</span>;
  }

  displayChoices = (offset) => {
    const currTimeslotList = this.state.artistAvailabilityAtLocation[this.state.currentDisplayLocation];
    console.log("this.state", this.state)

    const thisDate = new Date(this.state.currDisplayDate.getTime());
    thisDate.setDate(thisDate.getDate() + offset);

    const thisDateAvailabilities = currTimeslotList.filter((datedList) => {
      const timestring = datedList[0].startTime;
      const timeDateObj = new Date(timestring);
      return timeDateObj.toDateString() === thisDate.toDateString();
    });
    console.log("thisdataavailabilities", thisDateAvailabilities);

    if (thisDateAvailabilities.length > 0){
      const singleList = thisDateAvailabilities[0];
      return <td>
        {this.getDateString(thisDate)} <br/>
        { singleList.map((timeslot) => {
          console.log("inside map, ", this.state, this.state.timeslots.indexOf(timeslot._id))
          let disabled = false;
          if (this.state.timeslots.indexOf(timeslot._id) >= 0){
            disabled = true;
          }
          console.log(timeslot.startTime);
          const thisTime = new Date(timeslot.startTime);
          const minutes = thisTime.getMinutes() < 10 ? `0${thisTime.getMinutes()}` : thisTime.getMinutes();
          const timeString = thisTime.toLocaleString([], {hour12: false,
                                                                        month: "short",
                                                                        day: "numeric",
                                                                        year: "numeric",
                                                                        weekday: "short",
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",});
          return (
            <Button
              className={"btn-round timeslot-picker-timeslot"}
              color={"default"}
              id={timeslot._id}
              data-dismiss={"modal"}
              type={"button"}
              size={"sm"}
              onClick={this.selectTimeslot}
              value={timeString}
              disabled={disabled} outline>
              {`${thisTime.getHours()}:${minutes}`}
            </Button>
          )
        }) }
      </td>
    } else{
      return <td>{this.getDateString(thisDate)}<br/>
        <Button
          className={"btn-round timeslot-picker-placeholder"}
          color={"neutral"}
          size={"sm"}
          onClick={null}
          disabled={true}
        >
          n/a
        </Button></td>
    }

  }

  sendDateTime = async () => {
    // check if chosen timeslots are enough
    if (this.state.timeslots.length !== this.props.durationNeeded){
      alert(`Please select exactly ${this.props.durationNeeded} timeslots!`);
      return;
    }

    const ok = await this.props.sendDateTime(this.state.timeslots);
    if (ok){
      console.log("inside senddatrtime, setting state")
      this.setState({
        timeslots: [],
        selectedTimeStrings: [],
        timeslotsNeeded: 0,
        currDisplayDate: new Date(),
      })
      await this.componentDidMount();
    }
  }

  async componentDidMount() {

    // get artist availability
    const availability = await getArtistAvailability(this.props.artistId);
    this.setState({
      artistLocations: availability.availableLocations,
      artistAvailabilityAtLocation: availability.availabilityAtLocations,
      currentDisplayLocation: availability.availableLocations[0],
      currDisplayDate: new Date(availability.availabilityAtLocations[availability.availableLocations[0]][0][0].startTime),
      timeslotsNeeded: this.props.durationNeeded,
    });
    console.log("fetched artist availability",this.state)
  }

  render() {

    const {
      trigger,
      setTrigger,
      sendDateTime,
      isArtist,
      durationNeeded
    } = this.props;

    return (trigger) ? (
      <div>
        <Modal isOpen={trigger} toggle={setTrigger}>
          <div className={"modal-header"}>
            <h5 className={"modal-title"}>
              Pick/Alternate appointment time
            </h5>
          </div>
          <div className={"modal-body"}>
            {isArtist ?
              <span>Modify the date & time for this appointment.</span>
              :
              <span>Pick a suitable date & time for this appointment.</span>
            } <br/>
            {isArtist ? <span>You have previously estimated that this would need {durationNeeded} hour(s).</span> : <span>Your artist has indicated that this appointment has to be {durationNeeded} hour(s).</span>} <br/>
            <hr/>
            <table className={"timeslot-selected-table"}>
              <tr>
                <td>Timeslots needed:</td>
                <td className={"timeslot-selected-duration-cell"}>{durationNeeded - this.state.timeslots.length}</td>
              </tr>
              <tr>
                <td>Selected timeslots:</td>
                <td className={"timeslot-selected-cell"}>
                  {this.state.timeslots.map((timeslot) => {
                    const index = this.state.timeslots.indexOf(timeslot);
                    return (
                      <div>
                        <span>{this.state.selectedTimeStrings[index]}</span>
                        <i title={"Remove selected time"}
                           className={"icons nc-icon nc-simple-remove timeslot-remove-button"}
                           // id={`selected-${timeslot}`}
                           id={timeslot}
                           onClick={this.removeSelected}
                        />
                      </div>
                    )
                  })}
                </td>
              </tr>
            </table>
            <hr/>
            <Label for="location">Select a location: </Label>
            <Input type="select"
                   name="location"
                   id="location"
                   defaultValue={this.state.currentDisplayLocation}
                   onChange={this.handleChangeLocation}
            >
              {this.state.artistLocations.map((location) => {
                return <option>{location}</option>
              })}
            </Input>
            <hr/>
            <div className={"timeslot-picker-container"}>
              <i title={"Prev week"}
                 className={"icons nc-icon nc-minimal-left timeslot-prev"}
                 onClick={this.prevWeek}
              />
              <span className={"timeslot-picker-head"}>{isArtist ? "Availability" : "Availability of artist" }</span>
              <i title={"Next week"}
                 className={"icons nc-icon nc-minimal-right timeslot-next"}
                 onClick={this.nextWeek}
              />
              <br/>
              <table className={"timeslot-picker"}>
                <tr>
                  { [0,1,2,3,4,5,6].map((offset) => {
                    return this.displayChoices(offset)
                  }) }
                </tr>
              </table>
            </div>
          </div>

          <div className={"modal-footer"}>
            <Button
              className={"confirmation-button btn-round"}
              color={"default"}
              data-dismiss={"modal"}
              type={"button"}
              onClick={this.sendDateTime}
            >
              SEND
            </Button>
            <Button
              className={"confirmation-button btn-round"}
              color={"default"}
              data-dismiss={"modal"}
              type={"button"}
              onClick={setTrigger}
            >
              CANCEL
            </Button>
          </div>
        </Modal>
      </div>
    ) : "";
  }
}

export default PopUpSendDateTime