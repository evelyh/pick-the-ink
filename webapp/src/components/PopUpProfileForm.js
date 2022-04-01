import React from 'react'
import '../assets/css/userProfile.css'
import { useState, useEffect} from 'react';
import {Multiselect} from 'multiselect-react-dropdown';
import { getStyles } from 'apiHook/profile';
import {Form} from 'react-bootstrap'
import {postUser} from "../apiHook/profile"


function PopUpProfileForm(props) {
    const [validated, setValidated] = useState(false);
    console.log(props.info)
    const [prev] = useState({
        _id:props.info._id,
        firstName: props.info.firstName,
        lastName: props.info.lastName,
        userName: props.info.userName,
        email: props.info.email,
        birthDate: props.info.birthDate,
        phoneNum : props.info.phoneNum,
        favoriteStyles: props.info.favoriteStyles,
        image: props.info.image,
        isArtist: props.info.isArtist,
        followingIDs:props.info.followingIDs,
        followerIDs:props.info.following,
        comment:props.info.comment
      });

    const onSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log("submit error")
            event.preventDefault();
            event.stopPropagation();
        }else{
            event.preventDefault();
            await postUser(props.info);

            props.setTrigger(false);
            props.setSuccess(true);
            setValidated(true);}
      };

    const [option, setOption]=useState();

    useEffect(()=>{
        getStyles().then(json => 
          { setOption(json);});
      }, [validated])

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
                    <Form.Text id="formUsername">(cannot have empty spaces in username)</Form.Text>
                    <Form.Control type="text" 
                    value={props.info.userName}
                    onChange={e => {
                        props.setInfo({...props.info, userName:e.target.value.replace(/\s/g, '')});
                    }
                        }
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
                    value={props.info.birthDate}
                    onChange={e => props.setInfo({...props.info, birthDate:e.target.value})}
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
                        onSelect={e => {
                            let s = []
                            e.forEach((x, i) => s.push(x["_id"]));
                            props.setInfo({...props.info, favoriteStyles:s});}}
                        onRemove={e => {
                            let s = []
                            e.forEach((x, i) => s.push(x["_id"]));
                            props.setInfo({...props.info, favoriteStyles:s});}}></Multiselect>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Comment:</Form.Label>
                    <Form.Control type="text" 
                    value={props.info.comment}
                    onChange={e => props.setInfo({...props.info, comment:e.target.value})}/>
                    
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