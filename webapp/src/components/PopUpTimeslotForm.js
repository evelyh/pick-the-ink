import {React,useState }  from 'react'
import '../assets/css/userProfile.css'
import {Form} from 'react-bootstrap'
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import {postTimeslot} from "../apiHook/calender"

function PopUpTimeslotForm(props) {

    async function handleSubmit(data){
        data.preventDefault();
        console.log(date.format("YYYY/MM/DD"), starttime.format('HH'), endtime.format('HH'));
        // artistID, locationID, date, starttime, endtime
        await postTimeslot(props.artistID, props.locationID,date.format('YYYY-MM-DD'), starttime.format('HH'), endtime.format('HH'));
        props.setTrigger(false);
    }
    const [date, setDate] = useState(new Date());
    const [starttime, setStarttime] = useState(new Date());
    const [endtime, setEndtime] = useState(new Date());
    const [ confirm, setConfirm ] = useState(false)

    if (props.trigger) {
    return (
        <div className='popupTime'>
            <div className='popupInner'>  
              <Form className='popupForm' onSubmit={handleSubmit}>
                <h5 className='timeslotTitle'>Pleace choose the date, the start and end time on that day to add available timeslots for booking.</h5>
                <Form.Group className="mb-3" >
                
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                        ampm={false}
                        disablePast
                        label="Date"
                        value={date}
                        onChange={setDate}
                        />
                      </MuiPickersUtilsProvider>
                  </Form.Group>
                  
                  <Form.Group className="mb-3" >
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <TimePicker
                        ampm={false}
                        disablePast
                        label="Start time"
                        value={starttime}
                        onChange={setStarttime}
                        />
                      </MuiPickersUtilsProvider>
                  </Form.Group>
  
                  <Form.Group className="mb-3" >
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <TimePicker
                        ampm={false}
                        label="End time"
                        disablePast
                        value={endtime}
                        onChange={setEndtime}
                        />
                      </MuiPickersUtilsProvider>
                  </Form.Group>
                  <p className='timeslotText'>Note that start time need to be before than end time to create the timeslots successfully</p>
                  <button id="button-16" type="button" onClick={()=>{setConfirm(false);
                    props.setTrigger(false);}}>cancel</button>
                  <button id="button-16" type="submit">submit</button>
              </Form>
            </div>
        </div>
      )
    }else{return ""};
  }

export default PopUpTimeslotForm