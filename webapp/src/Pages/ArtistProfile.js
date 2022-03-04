import React from 'react'
import { Header } from '../components/Header'
import { Container } from 'react-bootstrap'
import profilePic from '../assets/img/profilepic.jpg'
import '../assets/css/userProfile.css'
import '../assets/css/artistsGallery.css'
import PopUpProfileForm from '../components/PopUpProfileForm'
import PopUpAppointmentForm from '../components/PopUpAppointmentForm'
import { useState } from 'react'
import { Card } from 'reactstrap'


function ArtistProfile() {

  const [values, setValues] = useState({
    firstName: "Sponge",
      lastName: "Bob",
      userName: "Spongebob",
      email: "spongebob@gmail.com",
      birthday: "1999-12-13",
      phoneNum : "1234567890",
      following: 309,
      followers: 622,
      homeLocation: "Bikini Bottom",
      artStyle: ["Blackwork", "Watercolor"], 
      style: ["Blackwork", "Watercolor"],
      image: "../images/profilepic.jpg"
  });

  const [buttonPopUp, setButtonPopUp] = useState(false);


  return (
    <div>
      <div>
        <Header/>
      </div>
      <PopUpAppointmentForm info={values} setInfo = {setValues} trigger={buttonPopUp} setTrigger={setButtonPopUp}>My Popup</PopUpAppointmentForm>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Card>
            <img src={profilePic} id="profileCirclePic" alt='profile' />
            </Card>
            <button id='button-appointment' onClick={()=> setButtonPopUp(true)}>Book an appointment</button>
          </div>
          <div className="col-7">
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

              <label className="col-sm-3 col-form-label col-form-label">Home Location:</label>
              <div className="col-sm-7">
                <label className="col-sm-6 col-form-label col-form-label">{values.homeLocation}</label>
              </div>

              <label className="col-sm-3 col-form-label col-form-label">Favorite styles:</label>
              <div className="col-sm-7">
                {values.style.map((_, index) => (
                  <li className="col-6 col-form-label col-form-label" key={index}>{values.style[index]}</li>
                ))}
              </div>

              <label className="col-sm-3 col-form-label col-form-label">My art styles:</label>
              <div className="col-sm-7">
                {values.style.map((_, index) => (
                  <li className="col-6 col-form-label col-form-label" key={index}>{values.artStyle[index]}</li>
                ))}
              </div>
              
              <label className="col-sm-3 col-form-label col-form-label">Following:</label>
              <div className="col-sm-7">
                <label className="col-sm-6 col-form-label col-form-label">{values.following}</label>
              </div>

              <label className="col-sm-3 col-form-label col-form-label">Followers:</label>
              <div className="col-sm-7">
                <label className="col-sm-6 col-form-label col-form-label">{values.followers}</label>
              </div>

            </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtistProfile
