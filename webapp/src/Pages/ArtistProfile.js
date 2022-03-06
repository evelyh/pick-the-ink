import React from 'react'
import { Header } from '../components/Header'
import { Container, Alert, CloseButton} from 'react-bootstrap'
import patrick from '../assets/img/patrick.jpg'
import profilepic from '../assets/img/profilepic.jpg'
import '../assets/css/userProfile.css'
import PopUpProfileForm from '../components/PopUpProfileForm'
import PopUpAppointmentForm from 'components/PopUpAppointmentForm'
import { useState } from 'react'
import { Card, CardBody, CardImg,CardText,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown} from 'reactstrap'


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
      homeLocation: "Bikini Bottom",
      isArtist: false,
      followers:1,
      following:0,
      comment:"hahahaha"
    });
    const [buttonPopUp, setButtonPopUp] = useState(false);
    const [buttonPopUpBook, setButtonPopUpBook] = useState(false);
    const [success,setSuccess] = useState(false);
    const [isUser] = useState(true);

    const onDismiss = ()=>{
      setSuccess(false);
    };

    return (
      <div>
        <div>
          <Header/>
        </div>
        <PopUpProfileForm info={values} setInfo = {setValues} success={success} setSuccess={setSuccess} trigger={buttonPopUp} setTrigger={setButtonPopUp} isUser={isUser}>My Popup</PopUpProfileForm>
        <PopUpAppointmentForm info={values} setInfo = {setValues} trigger={buttonPopUpBook} setTrigger={setButtonPopUpBook}>My Popup</PopUpAppointmentForm>
        <div className="container">
          <div className="row">
            <div className="col-3">
            <Card id="profileCard" style={{width: '20rem'}}>
              <CardBody>
                <CardImg src={values.image} id="profileCirclePic" alt='profile' />  
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
                    <DropdownItem tag="a" href="/userprofile/" >
                      <img id="profileDropdownPic" src={patrick} alt='patrick' ></img>
                      patrick
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardBody>
            </Card>
            <button id='button-16' onClick={()=> setButtonPopUpBook(true)}>Book an appointment</button>
            {isUser &&
                <button
                id='button-16'
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href='http://localhost:3000/artistgallery';
                  }}
            > Gallery</button>}
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
                
                {!isUser ? <label className="col-sm-3 col-form-label col-form-label">First Name:</label> : null}
                {!isUser ? 
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.firstName}</label>
                </div>
                : null}

                {!isUser ? <label className="col-sm-3 col-form-label col-form-label">Last Name:</label>:null}
                {!isUser ? 
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

                {!isUser ? <label className="col-sm-3 col-form-label col-form-label">Date of Birth:</label>:null}
                {!isUser ? 
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.birthday}</label>
                </div>
                :null}
                
                {!isUser ? <label className="col-sm-3 col-form-label col-form-label">Phone:</label>:null}
                {!isUser ? 
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

                <label className="col-sm-3 col-form-label col-form-label">My Art styles:</label>
                <div className="col-sm-7">
                  {values.style.map((_, index) => (
                    <li className="col-6 col-form-label col-form-label" key={index}>{values.artStyle[index]["name"]}</li>
                  ))}
                </div>
              </div>
              { !isUser ? <button id='button-16' onClick={()=> setButtonPopUp(true)}>Edit your profile</button> :null }
              </Container>
            </div>
          </div>
        </div>
      </div>
      )
  }

export default ArtistProfile

// import React from 'react'
// import { Header } from '../components/Header'
// import { Container} from 'react-bootstrap'
// import profilePic from '../assets/img/profilepic.jpg'
// import '../assets/css/userProfile.css'
// import '../assets/css/artistsGallery.css'
// import PopUpAppointmentForm from '../components/PopUpAppointmentForm'
// import { useState } from 'react'
// import { Card } from 'reactstrap'


// function ArtistProfile() {

//   const [values, setValues] = useState({
//     firstName: "Sponge",
//       lastName: "Bob",
//       userName: "Spongebob",
//       email: "spongebob@gmail.com",
//       birthday: "1999-12-13",
//       phoneNum : "1234567890",
//       following: 309,
//       followers: 622,
//       homeLocation: "Bikini Bottom",
//       artStyle: ["Blackwork", "Watercolor"], 
//       style: ["Blackwork", "Watercolor"],
//       image: "../images/profilepic.jpg"
//   });

//   const [buttonPopUp, setButtonPopUp] = useState(false);


//   return (
//     <div>
//       <div>
//         <Header/>
//       </div>
//       <PopUpAppointmentForm info={values} setInfo = {setValues} trigger={buttonPopUp} setTrigger={setButtonPopUp}>My Popup</PopUpAppointmentForm>
//       <div className="container">
//         <div className="row">
//           <div className="col-3">
//             <Card>
//             <img src={profilePic} id="profileCirclePic" alt='profile' />
//             </Card>
//             <button id='button-appointment' onClick={()=> setButtonPopUp(true)}>Book an appointment</button>
//           </div>
//           <div className="col-7">
//             <Container id="profileContainer">
//             <div className="row mb-3">
              
//               <label className="col-sm-3 col-form-label col-form-label">Username:</label>
//               <div className="col-sm-7">
//                 <label className="col-sm-6 col-form-label col-form-label">{values.userName}</label>
//               </div>

//               <label className="col-sm-3 col-form-label col-form-label">First name:</label>
//               <div className="col-sm-7">
//                 <label className="col-sm-6 col-form-label col-form-label">{values.firstName}</label>
//               </div>

//               <label className="col-sm-3 col-form-label col-form-label">Last name:</label>
//               <div className="col-sm-7">
//                 <label className="col-sm-6 col-form-label col-form-label">{values.lastName}</label>
//               </div>
              
//               <label className="col-sm-3 col-form-label col-form-label">Email:</label>
//               <div className="col-sm-7">
//                 <label className="col-sm-6 col-form-label col-form-label">{values.email}</label>
//               </div>

//               <label className="col-sm-3 col-form-label col-form-label">Date of Birth:</label>
//               <div className="col-sm-7">
//                 <label className="col-sm-6 col-form-label col-form-label">{values.birthday}</label>
//               </div>

//               <label className="col-sm-3 col-form-label col-form-label">Phone:</label>
//               <div className="col-sm-7">
//                 <label className="col-sm-6 col-form-label col-form-label">{values.phoneNum}</label>
//               </div>

//               <label className="col-sm-3 col-form-label col-form-label">Home Location:</label>
//               <div className="col-sm-7">
//                 <label className="col-sm-6 col-form-label col-form-label">{values.homeLocation}</label>
//               </div>

//               <label className="col-sm-3 col-form-label col-form-label">Favorite styles:</label>
//               <div className="col-sm-7">
//                 {values.style.map((_, index) => (
//                   <li className="col-6 col-form-label col-form-label" key={index}>{values.style[index]}</li>
//                 ))}
//               </div>

//               <label className="col-sm-3 col-form-label col-form-label">My art styles:</label>
//               <div className="col-sm-7">
//                 {values.style.map((_, index) => (
//                   <li className="col-6 col-form-label col-form-label" key={index}>{values.artStyle[index]}</li>
//                 ))}
//               </div>
              
//               <label className="col-sm-3 col-form-label col-form-label">Following:</label>
//               <div className="col-sm-7">
//                 <label className="col-sm-6 col-form-label col-form-label">{values.following}</label>
//               </div>

//               <label className="col-sm-3 col-form-label col-form-label">Followers:</label>
//               <div className="col-sm-7">
//                 <label className="col-sm-6 col-form-label col-form-label">{values.followers}</label>
//               </div>

//             </div>
//             </Container>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ArtistProfile
