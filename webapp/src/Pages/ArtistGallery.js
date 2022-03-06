import React from 'react'
import { Header } from '../components/Header'
import { Container } from 'react-bootstrap'
import profilePic from '../assets/img/profilepic.jpg'
import pic1 from '../assets/img/gallery_pic1.jpg'
import pic2 from '../assets/img/gallery_pic2.jpg'
import '../assets/css/userProfile.css'
import { VscAdd } from "react-icons/vsc";
import { IconContext } from "react-icons";
import PopUpAppointmentForm from '../components/PopUpAppointmentForm'
import PopUpEditGallery from '../components/PopUpEditGallery'
import PopUpDelGallery from "../components/PopUpDelGallery"
import PopUpAddGallery from "../components/PopUpAddGallery"
import { useState } from 'react'
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import FlatList from 'flatlist-react';

function ArtistGallery() {

  const [values, setValues] = useState({
    userName: "Spongebob",
    email: "spongebob@gmail.com",
    following: 309,
    followers: 622,
    homeLocation: "Bikini Bottom",
    image: "../images/profilepic.jpg",
    gallery:[
      {id:0, title: "My BF", description: "Patrick and me", img: pic1},
      {id:1, title: "Great time", description: "Patrick and me", img: pic2}],
  });

  const [buttonPopUpEdit, setButtonPopUpEdit] = useState(undefined);
  const [buttonPopUpDel, setButtonPopUpDel] = useState(undefined);
  const [buttonPopUpAdd, setButtonPopUpAdd] = useState(false);

  const deleteById = (id) => {
    setValues({gallery:values.gallery.filter((item)=>{
        return item.id !== id
    })})
  }

  const addNewPic = (newPic) => {
    const newGallery = values.gallery.concat(newPic);
    setValues({gallery: newGallery});
  }

  const renderItem = (galleryPic, index) => {

    return(
      <Card key={galleryPic.id} style={{width: '20rem'}}>
        <CardImg className='galleryPics' top src={galleryPic.img} alt="..."/>
        <CardBody>
        <CardTitle className='cardTitle'>{galleryPic.title}</CardTitle>
        <CardText className='cardText'>{galleryPic.description}</CardText>
          <PopUpEditGallery 
            values={values}
            title = {galleryPic.title}
            index = {index}
            description = {galleryPic.description}
            setValues = {setValues}
            trigger={buttonPopUpEdit} 
            setTrigger={setButtonPopUpEdit}
            >
              Edit 
          </PopUpEditGallery> 
          <PopUpDelGallery 
            values={values}
            index = {index}
            id = {galleryPic.id}
            setValues = {setValues}
            onDelete = {deleteById}
            trigger={buttonPopUpDel} 
            setTrigger={setButtonPopUpDel}
            >
              Del
          </PopUpDelGallery> 
            <Button id="edit" className="btn-round btn-icon" color="primary" size='sm' onClick={()=> setButtonPopUpEdit(index)}>Edit</Button>
            <Button id="del" className="btn-round btn-icon" color="danger" size='sm' onClick={()=> setButtonPopUpDel(index)}>Delete</Button>
        </CardBody>
      </Card>
    );
  }

    return (
      <div>
        <div>
          <Header/>
        </div>
        {/* <button id='button-addPic' onClick={()=> setButtonPopUp(true)}>+</button> */}
  
        {/* <PopUpAppointmentForm info={values} setInfo = {setValues} trigger={buttonPopUp} setTrigger={setButtonPopUp}>My Popup</PopUpAppointmentForm> */}
        <div className="container">
          <PopUpAddGallery
            values={values}
            setValues = {setValues}
            id = {values.gallery.length+1}
            onAdd = {addNewPic}
            trigger={buttonPopUpAdd} 
            setTrigger={setButtonPopUpAdd}
          >Add</PopUpAddGallery>
          <Button id="button-addPic" className="btn-round btn-icon" color="primary" onClick={()=> setButtonPopUpAdd(true)}>
            <IconContext.Provider value={{ color: 'white', size: '15px' }}><VscAdd/> Add </IconContext.Provider>
          </Button>
          <div className="row">
            <div className="col-3">
              <Container >
                <img src={profilePic} id="profileCirclePic"  alt='profile'  />
                {/* <button id='button-appointment' onClick={()=> setButtonPopUp(true)}>Book an appointment</button> */}
              </Container>
            </div>
            <div className='col-7'>
              <div className='header'>
                <h3>My Gallery</h3>
              </div>
              <ul>
              <FlatList
                list={values.gallery}
                renderItem={renderItem}
              />
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ArtistGallery