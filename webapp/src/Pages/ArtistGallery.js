import React from 'react'
import { Header } from '../components/Header'
import { Container } from 'react-bootstrap'
import profilePic from '../assets/img/profilepic.jpg'
import '../assets/css/userProfile.css'
import { VscAdd } from "react-icons/vsc";
import { IconContext } from "react-icons";
import PopUpAppointmentForm from '../components/PopUpAppointmentForm'
import PopUpEditGallery from '../components/PopUpEditGallery'
import PopUpDelGallery from "../components/PopUpDelGallery"
import PopUpAddGallery from "../components/PopUpAddGallery"
import { useState, useEffect } from 'react'
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import FlatList from 'flatlist-react';
import patrick from '../assets/img/patrick.jpg'
import { 
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown} from 'reactstrap'

import {getImageById} from "../apiHook/image"
import {getUser} from "../apiHook/profile"

// todo: update the homelocation and profile pic
// todo: update current userID
// todo: change the redirect link

function ArtistGallery() {

  const myID = "624765be4de0da31f0fca2f4";

  const [values, setValues] = useState({
    userName: "SpongeBob",
    email: "spongebob@gmail.com",
    following: 0,
    followers: 0,
    followerIDs: [],
    followingIDs: [],
    homeLocation: "Toronto",
    image: "../assets/img/profilepic.jpg",
    gallery:[],
  });

  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [buttonPopUpEdit, setButtonPopUpEdit] = useState(undefined);
  const [buttonPopUpDel, setButtonPopUpDel] = useState(undefined);
  const [buttonPopUpAdd, setButtonPopUpAdd] = useState(false);

  const [isUser] = useState(true);

  const [mounted, setMounted] = useState(false)

  if(!mounted){
    getUser(myID).then(async (json) => 
      { 
        console.log(json)
        json.followers = json.followerIDs.length;
        json.following = json.followingIDs.length;
        json.homeLocation = "Toronto";
        json.image = "../assets/img/profilepic.jpg"

        json.gallery = [];
        for(let i = 0; i < json.artistSub.artworks.length; i++){
          await getImageById(json.artistSub.artworks[i]).then(res => {
            console.log(res)
            const newImg = {
              id: res.images._id,
              title: res.images.title,
              img: res.images.img,
              desc: res.images.desc
            }
            json.gallery = json.gallery.concat(newImg);
            console.log(json.gallery)
          })
        }
        console.log("gallery")
        console.log(json.gallery)
        setValues(json)
        setButtonPopUp(false);
      });
  }

  useEffect(async () => {
    setMounted(true)
    await getUser(myID).then(json => 
      { 
        console.log(json)
        json.followers = json.followerIDs.length;
        json.following = json.followingIDs.length;
        json.homeLocation = "Toronto";
        json.image = "../assets/img/profilepic.jpg"

        json.gallery = [];
        for(let i = 0; i < json.artistSub.artworks.length; i++){
          getImageById(json.artistSub.artworks[i]).then(res => {
            console.log(res)
            const newImg = {
              id: res.images._id,
              title: res.images.title,
              img: res.images.img,
              desc: res.images.desc
            }
            json.gallery = json.gallery.concat(newImg);
            console.log(json.gallery)
          })
        }
        setValues(json)
        setButtonPopUp(false);
      });
  }, [buttonPopUp])


  const renderItem = (galleryPic, id) => {

    return(
      <div key={galleryPic.id} className="cardItem">
      <Card style={{width: '20rem'}}>
        <CardImg id="cardImg" className='galleryPics' top src={galleryPic.img} alt="..."/>
        <CardBody>
        <CardTitle className='cardTitle'>{galleryPic.title}</CardTitle>
        <CardText className='cardText'>{galleryPic.desc}</CardText>
          <PopUpEditGallery 
            values={values}
            title = {galleryPic.title}
            id = {id}
            description = {galleryPic.desc}
            setValues = {setValues}
            trigger={buttonPopUpEdit} 
            setTrigger={setButtonPopUpEdit}
            >
              Edit 
          </PopUpEditGallery> 
          <PopUpDelGallery 
            values={values}
            id = {id}
            myID = {myID}
            setValues = {setValues}
            trigger={buttonPopUpDel} 
            setTrigger={setButtonPopUpDel}
            >
              Del
          </PopUpDelGallery> 
            {isUser &&
              <Button id="edit" className="btn-round btn-icon" color="primary" size='sm' onClick={()=> setButtonPopUpEdit(id)}>Edit</Button>}
            {isUser &&
              <Button id="del" className="btn-round btn-icon" color="danger" size='sm' onClick={()=> setButtonPopUpDel(id)}>Delete</Button>}
        </CardBody>
      </Card>
      </div>
    );
  }
    return (
      <div>
        <div>
          <Header loggedIn={true}/>
        </div>
        {!isUser &&
        <PopUpAppointmentForm info={values} setInfo = {setValues} trigger={buttonPopUp} setTrigger={setButtonPopUp}>My Popup</PopUpAppointmentForm>}

        <div className="container">
          {isUser &&<PopUpAddGallery
            myID={myID}
            trigger={buttonPopUpAdd} 
            setTrigger={setButtonPopUpAdd}
          >Add</PopUpAddGallery>}
          {isUser &&
          <Button id="button-addPic" className="btn-round btn-icon" color="primary" onClick={()=> setButtonPopUpAdd(true)}>
            <IconContext.Provider value={{ color: 'white', size: '15px' }}><VscAdd/> Add </IconContext.Provider>
          </Button>}
          <div className="row">
            <div className="col-3">
              <Container>
              <Card id="profileCard" style={{width: '20rem'}}>
              <CardBody>
                <CardImg src={profilePic} id="profileCirclePic" alt='profile' />  
                <h5>{values.userName}</h5>
                <CardText>{values.comment}</CardText>
                <UncontrolledDropdown className="btn-group" id="profileDropdown">
                  <DropdownToggle tag="a"
                    data-toggle="dropdown">
                    Following: {values.following}
                  </DropdownToggle>
                  <DropdownMenu >
                    <DropdownItem tag="a" href="/userprofile/">
                      <img id="profileDropdownPic" src={patrick} alt='patrick' ></img>
                      patrick
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown className="btn-group">
                  <DropdownToggle tag="a"
                    data-toggle="dropdown">
                    Followers: {values.followers}
                  </DropdownToggle>
                  <DropdownMenu >
                    <DropdownItem tag="a" href="/userprofile/">
                      <img id="profileDropdownPic" src={patrick} alt='patrick' ></img>
                      patrick
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardBody>
            </Card>
            {!isUser &&
                <Button id="bt-book"
                size='sm'
                type="button"
                onClick={()=> setButtonPopUp(true)}>Book an appointment</Button>}

            <Button
                id="bt-pro"
                size='sm'
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href='http://localhost:3000/artistprofile';
                  }}
            > profile</Button>
              </Container>
            </div>
            <div className='col-6'>
              <div className='headerM'>
                <h3>My Gallery</h3>
                <div className='renderItemList'>
                    <FlatList
                      list={values.gallery}
                      renderItem={renderItem}
                      display={{
                        grid: true,
                        minColumnWidth: "400px",
                        gridGap: "120px"
                      }}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ArtistGallery