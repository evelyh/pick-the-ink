import React from 'react'
import '../assets/css/userProfile.css'
import { useState} from 'react';
import {Multiselect} from 'multiselect-react-dropdown';

import {Form} from 'react-bootstrap'


function PopUpProfileForm(props) {
    const [validated, setValidated] = useState(false);
    
    const [prev] = useState({
        firstName: props.info.firstName,
        lastName: props.info.lastName,
        userName: props.info.userName,
        email: props.info.email,
        birthday: props.info.birthday,
        phoneNum : props.info.phoneNum,
        style: props.info.style,
        image: props.info.image,
      });


    const onSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else{
            event.preventDefault();
            const data = new FormData(event.target);
            console.log(data);
            props.setTrigger(false);
            props.setSuccess(true);
            setValidated(true);}
      };

    const optionData = [{name:'Traditional', id: 1}, 
    {name:'Japanese', id: 2}, 
    {name:'New School', id: 3},
    {name:'Realism', id: 5}, 
    {name:'Illustrative', id: 6}, 
    {name: 'Portraiture', id: 7}, 
    {name: 'Blackwork', id: 8},
    {name: 'Watercolor', id: 9},
    {name:'Lettering',id: 10},
    {name:'Geometric',id: 11},
    {name:'Surrealism',id: 12},
    {name:'Microrealism',id: 13},
    {name:'Minimalism',id: 14},
    {name:'Single Line',id: 14},
    {name:'Dot Work',id: 14},];
    const [option]=useState(optionData);

    return (props.trigger) ? (
      <div className='popup' >
          <div className='popupInner'>  
            <Form noValidate validated={validated} onSubmit={onSubmit} className='popupForm'>
                <Form.Group className="mb-3" >
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control type="text" 
                    value={props.info.firstName}
                    onChange={e => props.setInfo({...props.info, firstName:e.target.value})}
                    required/>
                    <Form.Control.Feedback type="invalid">
                    Please enter a first name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control type="text" 
                    value={props.info.lastName}
                    onChange={e => props.setInfo({...props.info, lastName:e.target.value})}
                    required/>
                    <Form.Control.Feedback type="invalid">
                    Please enter a last name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" 
                    value={props.info.userName}
                    onChange={e => props.setInfo({...props.info, userName:e.target.value})}
                    required/>
                    <Form.Control.Feedback type="invalid">
                    Please enter a username.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" 
                    value={props.info.email}
                    onChange={e => props.setInfo({...props.info, email:e.target.value})}
                    placeholder="example@email.com"
                    required/>
                    <Form.Control.Feedback type="invalid">
                    Please enter a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Date of Birth:</Form.Label>
                    <Form.Control type="date"
                    value={props.info.birthday}
                    onChange={e => props.setInfo({...props.info, birthday:e.target.value})}
                    required/>
                    <Form.Control.Feedback type="invalid">
                    Please enter a date of birth.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control type="phone" 
                    value={props.info.phoneNum}
                    onChange={e => props.setInfo({...props.info, phoneNum:e.target.value})}
                    type="tel"
                    required/>
                    <Form.Control.Feedback type="invalid">
                    Please enter a valid phone number.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Favorite styles:</Form.Label>
                    <Multiselect options={option} displayValue="name"
                        onSelect={e => props.setInfo({...props.info, style:e})}
                        onRemove={e => props.setInfo({...props.info, style:e})}></Multiselect>
                </Form.Group>
                
                <button id="button-16" 
                onClick={()=>{
                    props.setInfo({...prev});
                    props.setTrigger(false);}}>cancel</button>
                <button id="button-16" type="submit" 
               >confirm</button>
            </Form>
          </div>
      </div>
    ):"";
  }

export default PopUpProfileForm