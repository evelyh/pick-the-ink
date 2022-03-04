import React from 'react'
import { Header } from '../components/header'
import { Card, Container } from 'react-bootstrap'
import profilePic from '../assets/img/profilepic.jpg'
import pic1 from '../assets/img/gallery_pic1.jpg'
import pic2 from '../assets/img/gallery_pic2.jpg'
import '../assets/css/userProfile.css'
import '../assets/css/artistsGallery.css'
import PopUpAppointmentForm from '../components/PopUpAppointmentForm'
import { useState } from 'react'


function ArtistGallery() {

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
      image: "../images/profilepic.jpg",
      hasShadow: false,
    });

    const [buttonPopUp, setButtonPopUp] = useState(false);


    return (
      <div>
        <div>
          <Header/>
        </div>
        <button id='button-addPic' onClick={()=> setButtonPopUp(true)}>+</button>

        <PopUpAppointmentForm info={values} setInfo = {setValues} trigger={buttonPopUp} setTrigger={setButtonPopUp}>My Popup</PopUpAppointmentForm>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Container >
                <img src={profilePic} id="profileCirclePic"  alt='profile'  />
                <button id='button-appointment' onClick={()=> setButtonPopUp(true)}>Book an appointment</button>
                <label className='infoLine'>Username: {values.userName}</label>
                <label className='infoLine'>Location: {values.homeLocation}</label>
              </Container>
            </div>
            <div className='col-7'>
              <div className='header'>
                <h3>My Gallery</h3>
              </div>
              <img src={pic1} className = "galleryPics"  alt='profile'  />
              <img src={pic2} className = "galleryPics"  alt='profile'  />
            </div>
          </div>
        </div>
      </div>
    )
  }

export default ArtistGallery