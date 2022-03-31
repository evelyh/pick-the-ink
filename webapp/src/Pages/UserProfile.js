import React from 'react'
import { Header } from '../components/Header'
import { Container, Alert, CloseButton} from 'react-bootstrap'
import patrick from '../assets/img/patrick.jpg'
import gary from '../assets/img/gary.jpg'
import krabs from '../assets/img/krabs.jpg'
import profilepic from '../assets/img/profilepic.jpg'
import '../assets/css/userProfile.css'
import PopUpProfileForm from '../components/PopUpProfileForm'
import { useState, useEffect } from 'react'
import { Card, CardBody, CardImg,CardText,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,Button} from 'reactstrap'
import {getUser, postUser} from "../apiHook/profile"

function UserProfile() {

    // Should get this data from the server
    const [buttonPopUp, setButtonPopUp] = useState(false);

    const [isUser] = useState(true);
    const [values, setValues] = useState(
      {firstName: "",
      lastName: "",
      userName: "",
      email: "",
      birthDate: "",
      phoneNum : "",
      favoriteStyles: [],
      image: "../images/patrick.jpg",
      isArtist: false,
      followingIDs:0,
      followerIDs:0,
      comment:""}
      );
    
    const [sendInfo, setSendInfo] = useState(values);
    const [success,setSuccess] = useState(false);

    useEffect(()=>{
      getUser("623f4747554c0d0d6fe6c99f").then(json => 
        { let data = json["result"];
          data.birthDate = data.birthDate.slice(0,10);
          setValues(data);
          setSendInfo(data);});
    }, [success])
 
    useEffect(()=>{
        if(sendInfo.firstName != "")
        {postUser(sendInfo,"623f4747554c0d0d6fe6c99f");}
        
      }, [success])
    

    const onDismiss = ()=>{
      setSuccess(false);
    };

    return (
      <div>
        <div>
          <Header loggedIn={true}/>
        </div>
        <PopUpProfileForm info={sendInfo} setInfo = {setSendInfo} success={success} setSuccess={setSuccess} trigger={buttonPopUp} setTrigger={setButtonPopUp}>My Popup</PopUpProfileForm>
        <div className="container">
          <div className="row">
            <div className="col-3">
            <Card id="profileCard" style={{width: '20rem'}}>
              <CardBody>
              <CardImg src={patrick} id="profileCirclePic" alt='profile' />  
              <h5>{values.userName}</h5>
              <CardText>{values.comment}</CardText>
            <UncontrolledDropdown className="btn-group" id="profileDropdown">
             <DropdownToggle tag="a"
              data-toggle="dropdown">
              Following: {}
              </DropdownToggle>
              <DropdownMenu >
              <DropdownItem tag="a" href="/userprofile/krab" >
              <img id="profileDropdownPic" src={krabs} alt='krabs' ></img>
              Mr.krab
              </DropdownItem>
              <DropdownItem  tag="a" href="/artistprofile">
              <img id="profileDropdownPic" src={profilepic} alt='profilepic' ></img>
              Spongebob
              </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown className="btn-group">
             <DropdownToggle tag="a"
              data-toggle="dropdown">
              Followers: {}
              </DropdownToggle>
              <DropdownMenu >
              <DropdownItem tag="a" href="/userprofile/gary" >
              <img id="profileDropdownPic" src={gary} alt='gary' ></img>
              Gary
              </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

              </CardBody>
            </Card>
            </div>
            <div className="col-7">
            <Alert variant="success" show={success}>
              <p>Profile Update successfully <CloseButton id = "closeButton" variant="white" onClick={onDismiss}/> </p>
            </Alert>
              <Container id="profileContainer">
              <div className="row mb-3">
                
                
                <label className="col-sm-3 col-form-label col-form-label">Username:</label>
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.userName}</label>
                </div>
                
                {isUser ? <label className="col-sm-3 col-form-label col-form-label">First Name:</label> : null}
                {isUser ? 
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.firstName}</label>
                </div>
                : null}

                {isUser ? <label className="col-sm-3 col-form-label col-form-label">Last Name:</label>:null}
                {isUser ? 
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.lastName}</label>
                </div>
                :null}
                
                <label className="col-sm-3 col-form-label col-form-label">Email:</label>
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.email}</label>
                </div>

                {isUser ? <label className="col-sm-3 col-form-label col-form-label">Date of Birth:</label>:null}
                {isUser ? 
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.birthDate}</label>
                </div>
                :null}
                
                {isUser ? <label className="col-sm-3 col-form-label col-form-label">Phone:</label>:null}
                {isUser ? 
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.phoneNum}</label>
                </div>
                :null}

                <label className="col-sm-3 col-form-label col-form-label">Favorite styles:</label>
                {values.favoriteStyles ?
                <div className="col-sm-7">
                  {values.favoriteStyles.map((_, index) => (
                    <li className="col-6 col-form-label col-form-label" key={index}>{values.favoriteStyles[index]["name"]}</li>
                  ))}
                </div>
                :null}
              </div>
              { isUser ? <Button size='sm' onClick={()=> setButtonPopUp(true)}>Edit your profile</Button> :null }
              </Container>
            </div>
          </div>
        </div>
      </div>
      )
  }

export default UserProfile