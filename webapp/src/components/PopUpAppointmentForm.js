import {React, useState }  from 'react'
import '../assets/css/userProfile.css'

import {Form, Button} from 'react-bootstrap'


function PopUpAppointmentForm(props) {

    const handleSubmit = (data) => {
        data.preventDefault(); 
        console.log(form)
        props.setTrigger(false);
    }

    const [ form, setForm ] = useState({})

    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        })
      }

    return (props.trigger) ? (
      <div className='popup'>
          <div className='popupInner'>  
            <h3>{props.info.userName}'s Booking Form:</h3>
            <Form className='popupForm' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control type="text" onChange={ e => setField('userName', e.target.value) }/>
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
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>What are you interested in getting:</Form.Label>
                    <Form.Control as='select' onChange={ e => setField('type', e.target.value) }>
                        <option>---Choose---</option>
                        <option>Flash</option>
                        <option>Custom Design</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>For flash disign, please send a screenshot of the design:</Form.Label>
                    <Form.Control type="file" className="form-control-file" onChange={ e => setField('flashPhoto', e.target.value) }/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>For custom disign, please describe your ideas in detail:</Form.Label>
                    <textarea className="form-control" rows="3"  onChange={ e => setField('customIdea', e.target.value) }></textarea>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>What size are you thinking (in inches or cm):</Form.Label>
                    <Form.Control type="text" onChange={ e => setField('size', e.target.value) }/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Where do you want to place the tattoo:</Form.Label>
                    <Form.Control type="text" onChange={ e => setField('placement', e.target.value) }/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Please send us any reference photos, drawings, sketches, screenshots, etc. that will help to explain your ideas:</Form.Label>
                    <Form.Control type="file" className="form-control-file" onChange={ e => setField('otherPhoto', e.target.value) }/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Anything else we should know (allergies, accommodations, peronal concerns ):</Form.Label>
                    <textarea className="form-control" rows="3" onChange={ e => setField('others', e.target.value) }></textarea>
                </Form.Group>


                <Button id="button-16" type="button" onClick={()=>{props.setTrigger(false);}}>close</Button>
                <Button id="button-16" type="submit" >confirm</Button>
            </Form>
          </div>
      </div>
    ):"";
  }

export default PopUpAppointmentForm