import {React, useState }  from 'react'
import '../assets/css/userProfile.css'
import {Form} from 'react-bootstrap'
import {addBooking} from '../apiHook/booking.js'


function PopUpAppointmentForm(props) {

    async function handleSubmit(data){
        data.preventDefault(); 
        const result = await addBooking(form);
        console.log(result)
        if(result == 200){
            props.setTrigger(false);
        }
        
    }

    const [ form, setForm ] = useState({})
    const [ confirm, setConfirm ] = useState(false)

    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        })
      }

    if (props.trigger) {
    return (
        <div className='popup'>
            <div className='popupInner'>  
            <h4 id="bookingFormTitle">{props.info.userName}'s Booking Form:</h4>
              <Form className='popupForm' onSubmit={handleSubmit}>
              
                  {/* <Form.Group className="mb-3" >
                      <Form.Label>First Name:</Form.Label>
                      <Form.Control type="text"
                      id='firstName'
                      onChange={ e => setField('firstName', e.target.value) }/>
                  </Form.Group>
  
                  <Form.Group className="mb-3" >
                      <Form.Label>Last Name:</Form.Label>
                      <Form.Control type="text" onChange={ e => setField('lastName', e.target.value) }/>
                  </Form.Group>
  
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control type="email" placeholder="name@example.com" onChange={ e => setField('email', e.target.value) }/>
                  </Form.Group>
  
                  <Form.Group className="mb-3" >
                      <Form.Label>Date of Birth:</Form.Label>
                      <Form.Control type="date" onChange={ e => setField('birthday', e.target.value) }/>
                  </Form.Group>
  
                  <Form.Group className="mb-3" >
                      <Form.Label>Phone:</Form.Label>
                      <Form.Control type="phone" onChange={ e => setField('phone', e.target.value) }/>
                  </Form.Group> */}
  
                  <Form.Group className="mb-3" >
                      <Form.Label>What are you interested in getting:</Form.Label>
                      <Form.Control as='select' 
                      id="choice"
                      onChange={ e => setField('choice', e.target.value) }
                      required>
                          <option>Flash</option>
                          <option>Custom Design</option>
                      </Form.Control>
                  </Form.Group>
  
                  <Form.Group className="mb-3" >
                      <Form.Label>For flash disign, please send a screenshot of the design:</Form.Label>
                      <Form.Control 
                      type="file" 
                      id='flashLink'
                      className="form-control-file" 
                      onChange={ e => setField('flashLink', e.target.files[0]) }/>
                  </Form.Group>
  
                  <Form.Group className="mb-3" >
                      <Form.Label>For custom disign, please describe your ideas in detail:</Form.Label>
                      <textarea 
                      className="form-control" 
                      id="customIdea"
                      rows="3"  
                      onChange={ e => setField('customIdea', e.target.value) }></textarea>
                  </Form.Group>
  
                  <Form.Group className="mb-3" >
                      <Form.Label>What size are you thinking (in inches or cm):</Form.Label>
                      <Form.Control 
                      id="size"
                      type="text" 
                      onChange={ e => setField('size', e.target.value) }
                      required/>
                  </Form.Group>
  
                  <Form.Group className="mb-3" >
                      <Form.Label>Where do you want to place the tattoo:</Form.Label>
                      <Form.Control 
                      id="placement"
                      type="text" 
                      onChange={ e => setField('placement', e.target.value) }
                      required/>
                  </Form.Group>
  
                  <Form.Group className="mb-3" >
                      <Form.Label>Please send us any reference photos, drawings, sketches, screenshots, etc. that will help to explain your ideas:</Form.Label>
                      <Form.Control 
                      type="file" 
                      id="otherLink"
                      className="form-control-file" 
                      onChange={ e => setField('otherLink', e.target.files[0]) }/>
                  </Form.Group>
  
                  <Form.Group className="mb-3" >
                      <Form.Label>Anything else we should know (allergies, accommodations, peronal concerns ):</Form.Label>
                      <textarea 
                      className="form-control" 
                      id="concern"
                      rows="3" 
                      onChange={ e => setField('concern', e.target.value) }></textarea>
                  </Form.Group>
  
  
                  <button id="button-16" type="button" onClick={()=>{setConfirm(false);
                    props.setTrigger(false);}}>cancel</button>
                  <button id="button-16" type="submit" 
                  onClick={()=>
                    {setConfirm(true);}}>submit</button>
              </Form>
            </div>
        </div>
      )

    }else if(confirm){
        return (<div className='popupSuccess'>
        <div className='popupInner'>
           <h4>Form submitted successfully !</h4>
           <p>Artist will reach out to you to discuss about the length of the appointment and let you to choose an available spot.
               A notification will be send to you after the artist review your booking form. Related informations will be in the manage booking page.
           </p>
        <button id="button-16" type="button" onClick={()=>{setConfirm(false);
                    props.setTrigger(false);}}>Got it!</button>
        </div>
    </div>);
    }else{return ""};
    
  }

export default PopUpAppointmentForm