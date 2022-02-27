import React, { Component } from 'react'
import '../assets/css/userProfile.css'

import {Form} from 'react-bootstrap'


function PopUpProfileForm(props) {
    return (props.trigger) ? (
      <div className='popup'>
          <div className='popupInner'>           
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control type="text" 
                    value={props.info.firstName}
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
                <button id="button-16" onClick={()=>props.setTrigger(false)}>close</button>
            </Form>
          </div>
      </div>
    ):"";
  }

export default PopUpProfileForm