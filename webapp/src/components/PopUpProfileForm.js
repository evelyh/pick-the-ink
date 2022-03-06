import React from 'react'
import '../assets/css/userProfile.css'
import { useState} from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';

import {Form} from 'react-bootstrap'
import { useForm} from "react-hook-form";


function PopUpProfileForm(props) {
    const {handleSubmit} = useForm();
    
    const [prev] = useState({
        firstName: props.info.firstName,
        lastName: props.info.lastName,
        userName: props.info.userName,
        email: props.info.email,
        comment: props.info.comment,
        followers: props.info.followers,
        following: props.info.following,
        birthday: props.info.birthday,
        phoneNum : props.info.phoneNum,
        style: props.info.style,
        image: props.info.image,
      });

    const isUser = props.isUser;

    let homeLocation = undefined;

    if (isUser){
        homeLocation = props.info.homeLocation
    }
    
    const onSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data);
    }

    return (props.trigger) ? (
      <div className='popup' >
          <div className='popupInner'>  
            <Form onSubmit={handleSubmit(onSubmit)} className='popupForm'>
                <Form.Group className="mb-3" >
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control type="text" 
                    value={props.info.firstName}
                    initialValue="admin"
                    onChange={e => props.setInfo({...props.info, firstName:e.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control type="text" 
                    value={props.info.lastName}
                    onChange={e => props.setInfo({...props.info, lastName:e.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" 
                    value={props.info.userName}
                    onChange={e => props.setInfo({...props.info, userName:e.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" 
                    value={props.info.email}
                    onChange={e => props.setInfo({...props.info, email:e.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Date of Birth:</Form.Label>
                    <Form.Control type="date" 
                    value={props.info.birthday}
                    onChange={e => props.setInfo({...props.info, birthday:e.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control type="phone" 
                    value={props.info.phoneNum}
                    onChange={e => props.setInfo({...props.info, phoneNum:e.target.value})}/>
                </Form.Group>

                {!isUser &&
                <Form.Group className="mb-3" >
                    <Form.Label>Home Locaiton:</Form.Label>
                    <Form.Control type="text" 
                    value={props.info.homeLocation}
                    onChange={e => props.setInfo({...props.info, homeLocation:e.target.value})}/>
                </Form.Group>}

                <button id="button-16" 
                onClick={()=>{
                    props.setInfo({...prev});
                    props.setTrigger(false);}}>cancel</button>
                <button id="button-16" type="submit" onClick={()=>props.setTrigger(false)}>confirm</button>
            </Form>
          </div>
      </div>
    ):"";
  }

export default PopUpProfileForm