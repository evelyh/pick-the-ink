import React, { Component } from 'react'
import { Header } from '../components/Header'
import { Container } from 'react-bootstrap'
import profilePic from '../assets/img/profilepic.jpg'
import '../assets/css/userProfile.css'
import PopUpProfileForm from '../components/PopUpProfileForm'
import { useState } from 'react'


function UserProfile() {
    // const userName = "SpongeBob"
    // const email = "spongebob@gmail.com"
    // const birthday = "1999/12/13"
    // const phoneNum = "1234567890"
    // const style = ["Blackwork", "Watercolor"]
    // const image = "../images/profilepic.jpg"

    const [values, setValues] = useState({
      firstName: "Sponge",
      lastName: "Bob",
      userName: "Spongebob",
      email: "spongebob@gmail.com",
      birthday: "1999-12-13",
      phoneNum : "1234567890",
      style: ["Blackwork", "Watercolor"],
      image: "../images/profilepic.jpg"
    });

    const [buttonPopUp, setButtonPopUp] = useState(false);


    return (
      <div>
        <div>
          <Header/>
        </div>
        <PopUpProfileForm info={values} setInfo = {setValues} trigger={buttonPopUp} setTrigger={setButtonPopUp}>My Popup</PopUpProfileForm>
        <div class="container">
          <div class="row">
            <div class="col-3">
              <Container>
              <img src={profilePic} id="profileCirclePic" alt='profile picture' />
              </Container>
            </div>
            <div class="col-7">
              <Container id="profileContainer">
              <div class="row mb-3">
                
                <label for="colFormLabel" class="col-sm-3 col-form-label col-form-label">Username:</label>
                <div class="col-sm-7">
                  <label for="colFormLabel" class="col-sm-2 col-form-label col-form-label">{values.userName}</label>
                </div>
                
                <label for="colFormLabel" class="col-sm-3 col-form-label col-form-label">Email:</label>
                <div class="col-sm-7">
                  <label for="colFormLabel" class="col-sm-2 col-form-label col-form-label">{values.email}</label>
                </div>

                <label for="colFormLabel" class="col-sm-3 col-form-label col-form-label">Date of Birth:</label>
                <div class="col-sm-7">
                  <label for="colFormLabel" class="col-sm-2 col-form-label col-form-label">{values.birthday}</label>
                </div>

                <label for="colFormLabel" class="col-sm-3 col-form-label col-form-label">Phone:</label>
                <div class="col-sm-7">
                  <label for="colFormLabel" class="col-sm-2 col-form-label col-form-label">{values.phoneNum}</label>
                </div>

                <label for="colFormLabel" class="col-sm-3 col-form-label col-form-label">Favorite styles:</label>
                <div class="col-sm-7">
                  {values.style.map((_, index) => (
                    <li for="colFormLabel" class="col-5 col-form-label col-form-label">{values.style[index]}</li>
                  ))}
                </div>
              </div>
              <button id='button-16' onClick={()=> setButtonPopUp(true)}>Edit your profile</button>
              </Container>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default UserProfile