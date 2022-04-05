import React from 'react'
import '../assets/css/userProfile.css'
import { useState, useEffect } from 'react';
import {Multiselect} from 'multiselect-react-dropdown';

import {Form} from 'react-bootstrap'
import { postUser } from 'apiHook/profile';
import { getStyles } from 'apiHook/profile';

const log = console.log

function PopUpArtistProfileForm(props) {

    log(props.info)

    const [validated, setValidated] = useState(false);
    
    const [prev] = useState({
        firstName: props.info.firstName,
        lastName: props.info.lastName,
        userName: props.info.userName,
        email: props.info.email,
        birthDate: props.info.birthDate,
        phoneNum : props.info.phoneNum,
        favoriteStyles: props.info.favoriteStyles,
        artStyle:props.info.artStyle,
        homeLocation: props.info.homeLocation,
        image: props.info.image,
        isArtist: props.info.isArtist,
        followingIDs:props.info.followingIDs,
        followerIDs:props.info.followerIDs,
        comment:props.info.comment
      });


    const onSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else{
            event.preventDefault();
            await postUser(props.info);

            // const data = new FormData(event.target);
            // console.log(data);
            props.setTrigger(false);
            props.setSuccess(true);
            setValidated(true);}
      };

    // const optionData = [{name:'Traditional', id: 1}, 
    // {name:'Japanese', id: 2}, 
    // {name:'New School', id: 3},
    // {name:'Realism', id: 5}, 
    // {name:'Illustrative', id: 6}, 
    // {name: 'Portraiture', id: 7}, 
    // {name: 'Blackwork', id: 8},
    // {name: 'Watercolor', id: 9},
    // {name:'Lettering',id: 10},
    // {name:'Geometric',id: 11},
    // {name:'Surrealism',id: 12},
    // {name:'Microrealism',id: 13},
    // {name:'Minimalism',id: 14},
    // {name:'Single Line',id: 15},
    // {name:'Dot Work',id: 16},];
    // const [option]=useState(optionData);

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
                      <Form.Label>Profile Picture:</Form.Label>
                      <Form.Control 
                      type="file" 
                      id='profilePic'
                      className="form-control-file" 
                      onChange={ e => props.setInfo({...props.info, profilePic: e.target.files[0]})}/>
                </Form.Group>

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
                    }}
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

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Home Location:</Form.Label>
                    <Form.Control type="text" 
                    value={props.info.homeLocation}
                    onChange={e => props.setInfo({...props.info, homeLocation:e.target.value})}
                    required/>
                    <Form.Control.Feedback type="invalid">
                    Please enter a valid home location.
                    </Form.Control.Feedback>
                </Form.Group>

                {/* <Form.Group className="mb-3" >
                    <Form.Label>Favorite styles:</Form.Label>
                    <Multiselect options={option} displayValue="name"
                        onSelect={e => props.setInfo({...props.info, style:e})}
                        onRemove={e => props.setInfo({...props.info, style:e})}></Multiselect>
                </Form.Group> */}

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
                    <Form.Label>My Art styles:</Form.Label>
                    <Multiselect options={option} displayValue="name"
                        onSelect={e => props.setInfo({...props.info, artStyle:e})}
                        onRemove={e => props.setInfo({...props.info, artStyle:e})}></Multiselect>
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

export default PopUpArtistProfileForm