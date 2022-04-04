import React from 'react'
import { Header } from '../components/Header'
import { Container, Alert, CloseButton} from 'react-bootstrap'
import patrick from '../assets/img/patrick.jpg'
import profilepic from '../assets/img/profilepic.jpg'
import '../assets/css/userProfile.css'
import PopUpArtistProfileForm from '../components/PopUpArtistProfileForm'
import { useState } from 'react'
import { Card, CardBody, CardImg,CardText,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Button,
  Row} from 'reactstrap'
import PopUpAppointmentForm from 'components/PopUpAppointmentForm'
import ArtistNavBar from '../components/ArtistNavBar'
import PopUpTimeslotForm from 'components/PopUpTimeslotForm';

function ArtistProfile() {

    // Should get this data from the server
    const [values, setValues] = useState({
      firstName: "Sponge",
      lastName: "Bob",
      userName: "SpongeBob",
      email: "spongebob@gmail.com",
      birthday: "1999-12-13",
      phoneNum : "123-456-7890",
      style: [{name: 'Blackwork', id: 1},{name: 'Watercolor', id: 2}],
      artStyle: [{name: 'Blackwork', id: 1},{name: 'Watercolor', id: 2}],
      image: profilepic,
      homeLocation: "Toronto",
      isArtist: true,
      followers:1,
      following:0,
      comment:"hahahaha"
    });
    const [buttonPopUp, setButtonPopUp] = useState(false);
    const [buttonPopUpBook, setButtonPopUpBook] = useState(false);
    const [success,setSuccess] = useState(false);
    const [isUser] = useState(false);

    const [timeslotButtonPopUp, setTimeslotButtonPopUp] = useState(false);

    const onDismiss = ()=>{
      setSuccess(false);
    };

    return (
      <div>
        <div>
          <Header loggedIn={true}/>
        </div>
        <div><ArtistNavBar></ArtistNavBar></div>
        <PopUpArtistProfileForm info={values} setInfo = {setValues} success={success} setSuccess={setSuccess} trigger={buttonPopUp} setTrigger={setButtonPopUp}>My Popup</PopUpArtistProfileForm>
        {isUser ? null : <PopUpAppointmentForm info={values} setInfo = {setValues} trigger={buttonPopUpBook} setTrigger={setButtonPopUpBook}>My Popup</PopUpAppointmentForm>}
        
        {isUser ?  <PopUpTimeslotForm trigger={timeslotButtonPopUp} setTrigger={setTimeslotButtonPopUp}>My Popup</PopUpTimeslotForm>:null}
        
        <div className="container">
          <div className="row">
            <div className="col-3">
            <Card id="profileCard" style={{width: '20rem'}}>
              <CardBody>
              <CardImg src={profilepic} id="profileCirclePic" alt='profile' />  
              <h5>{values.userName}</h5>
              <CardText>{values.comment}</CardText>
            <UncontrolledDropdown className="btn-group" id="profileDropdown">
             <DropdownToggle tag="a"
              data-toggle="dropdown">
              Following: {values.following}
              </DropdownToggle>
              <DropdownMenu >
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown className="btn-group">
             <DropdownToggle tag="a"
              data-toggle="dropdown">
              Followers: {values.followers}
              </DropdownToggle>
              <DropdownMenu >
              <DropdownItem tag="a" href="/userprofile/gary" >
              <img id="profileDropdownPic" src={patrick} alt='PatrickYahhh' ></img>
              PatrickYahhh
              </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            </CardBody>
            </Card>
            
            {isUser? null: <Button size='sm'
                type="button" onClick={()=> setButtonPopUpBook(true)}>Book an appointment</Button>}
            {/* <Button
                size='sm'
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href='http://localhost:3000/artistgallery';
                  }}
            > Gallery</Button> */}

            { isUser ? <Button size='sm' onClick={()=> setTimeslotButtonPopUp(true)}>Post available time</Button> :null }
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
                
                <label className="col-sm-3 col-form-label col-form-label">Home Location:</label>
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.homeLocation}</label>
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

                <label className="col-sm-3 col-form-label col-form-label">My art styles:</label>
                <div className="col-sm-7">
                  {values.artStyle.map((_, index) => (
                    <li className="col-6 col-form-label col-form-label" key={index}>{values.artStyle[index]["name"]}</li>
                  ))}
                </div>
              </div>
              { isUser ? <Button size='sm' onClick={()=> setButtonPopUp(true)}>Edit your profile</Button> :null }
              
              </Container>
            </div>
          </div>
        </div>
        <div>
        <footer className="footer footer-black footer-white">
          <Container>
            <Row>
              <div className="credits ml-auto">
              <span className="copyright">
                © {new Date().getFullYear()}, made with{" "}
                <i className="fa fa-heart heart" /> by Creative Team09
              </span>
              </div>
            </Row>
          </Container>
        </footer>
        </div>
      </div>
      )
  }

export default ArtistProfile