import React from 'react'
import { Header } from '../components/Header'
import { Container, Alert, CloseButton} from 'react-bootstrap'
import patrick from '../assets/img/patrick.jpg'
import gary from '../assets/img/gary.jpg'
import krabs from '../assets/img/krabs.jpg'
import squidward from '../assets/img/squidward.jpg'
import profilepic from '../assets/img/profilepic.jpg'
import '../assets/css/userProfile.css'
import PopUpProfileForm from '../components/PopUpProfileForm'
import { useState } from 'react'
import { Card, CardBody, CardImg,CardText,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown} from 'reactstrap'


function UserProfileKrab() {

    const [values, setValues] = useState({
      firstName: "Eugene",
      lastName: "Krab",
      userName: "Mr.Krab",
      email: "eugenekrab@gmail.com",
      birthday: "1999-12-13",
      phoneNum : "1234567890",
      style: [{name:'Traditional', id: 1},{name:'Lettering',id: 10},{name:'Minimalism',id: 14}],
      image: "../images/patrick.jpg",
      isArtist: false,
      followers:1,
      following:1,
      comment:"I can't see my forehead!"
    });
    const [buttonPopUp, setButtonPopUp] = useState(false);
    const [success,setSuccess] = useState(false);
    const [isUser,_] = useState(false);

    const onDismiss = ()=>{
      setSuccess(false);
    };

    return (
      <div>
        <div>
          <Header/>
        </div>
        <PopUpProfileForm info={values} setInfo = {setValues} success={success} setSuccess={setSuccess} trigger={buttonPopUp} setTrigger={setButtonPopUp}>My Popup</PopUpProfileForm>
        <div className="container">
          <div className="row">
            <div className="col-3">
            <Card id="profileCard" style={{width: '20rem'}}>
              <CardBody>
              <CardImg src={krabs} id="profileCirclePic" alt='profile' />  
              <h5>{values.userName}</h5>
              <CardText>{values.comment}</CardText>
            <UncontrolledDropdown className="btn-group" id="profileDropdown">
             <DropdownToggle tag="a"
              data-toggle="dropdown">
              Following: {values.following}
              </DropdownToggle>
              <DropdownMenu >
              <DropdownItem tag="a" href="/userprofile/gary">
              <img id="profileDropdownPic" src={gary}></img>
              Gary
              </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown className="btn-group">
             <DropdownToggle tag="a"
              data-toggle="dropdown">
              Followers: {values.followers}
              </DropdownToggle>
              <DropdownMenu >
              <DropdownItem tag="a" href="/userprofile/gary" >
              <img id="profileDropdownPic" src={gary}></img>
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
                  <label className="col-sm-6 col-form-label col-form-label">{values.birthday}</label>
                </div>
                :null}
                
                {isUser ? <label className="col-sm-3 col-form-label col-form-label">Phone:</label>:null}
                {isUser ? 
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.phoneNum}</label>
                </div>
                :null}

                <label className="col-sm-3 col-form-label col-form-label">Favorite styles:</label>
                <div className="col-sm-7">
                  {values.style.map((_, index) => (
                    <li className="col-6 col-form-label col-form-label" key={index}>{values.style[index]["name"]}</li>
                  ))}
                </div>
              </div>
              { isUser ? <button id='button-16' onClick={()=> setButtonPopUp(true)}>Edit your profile</button> :null }
              </Container>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default UserProfileKrab