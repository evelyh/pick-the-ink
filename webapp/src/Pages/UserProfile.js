import React from 'react'
import { Header } from '../components/Header'
import { Container, Alert, CloseButton} from 'react-bootstrap'
import profilePic from '../assets/img/profilepic.jpg'
import '../assets/css/userProfile.css'
import PopUpProfileForm from '../components/PopUpProfileForm'
import { useState } from 'react'
import { Card} from 'reactstrap'


function UserProfile() {

    const [values, setValues] = useState({
      firstName: "Sponge",
      lastName: "Bob",
      userName: "Spongebob",
      email: "spongebob@gmail.com",
      birthday: "1999-12-13",
      phoneNum : "1234567890",
      style: [{name: 'Blackwork', id: 1},{name: 'Watercolor', id: 2}],
      image: "../images/profilepic.jpg",
      isArtist: false
    });

    const [buttonPopUp, setButtonPopUp] = useState(false);
    const [success,setSuccess] = useState(false);

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
              <Card>
              <img src={profilePic} id="profileCirclePic" alt='profile' />
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

                <label className="col-sm-3 col-form-label col-form-label">First name:</label>
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.firstName}</label>
                </div>

                <label className="col-sm-3 col-form-label col-form-label">Last name:</label>
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.lastName}</label>
                </div>
                
                <label className="col-sm-3 col-form-label col-form-label">Email:</label>
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.email}</label>
                </div>

                <label className="col-sm-3 col-form-label col-form-label">Date of Birth:</label>
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.birthday}</label>
                </div>

                <label className="col-sm-3 col-form-label col-form-label">Phone:</label>
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.phoneNum}</label>
                </div>

                <label className="col-sm-3 col-form-label col-form-label">Favorite styles:</label>
                <div className="col-sm-7">
                  {values.style.map((_, index) => (
                    <li className="col-6 col-form-label col-form-label" key={index}>{values.style[index]["name"]}</li>
                  ))}
                </div>
              </div>
              { values.isArtist ? null : <button id='button-16' onClick={()=> setButtonPopUp(true)}>Edit your profile</button> }
              </Container>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default UserProfile