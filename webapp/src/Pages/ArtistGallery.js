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
import patrick from '../assets/img/patrick.jpg'
import { 
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown} from 'reactstrap'

function ArtistGallery() {

  const [values, setValues] = useState({
    userName: "Spongebob",
    email: "spongebob@gmail.com",
    following: 0,
    followers: 1,
    comment:"hahahaha",
    homeLocation: "Bikini Bottom",
    image: "../images/profilepic.jpg",
    gallery:[
      {id:0, title: "My BF", description: "Patrick and me", img: pic1},
      {id:1, title: "Great time", description: "Patrick and me", img: pic2}],
  });

  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [buttonPopUpEdit, setButtonPopUpEdit] = useState(undefined);
  const [buttonPopUpDel, setButtonPopUpDel] = useState(undefined);
  const [buttonPopUpAdd, setButtonPopUpAdd] = useState(false);

  const [isAritist] = useState(false);

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
      <div className="cardItem">
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
            {isAritist &&
              <Button id="edit" className="btn-round btn-icon" color="primary" size='sm' onClick={()=> setButtonPopUpEdit(index)}>Edit</Button>}
            {isAritist &&
              <Button id="del" className="btn-round btn-icon" color="danger" size='sm' onClick={()=> setButtonPopUpDel(index)}>Delete</Button>}
        </CardBody>
      </Card>
      </div>
    );
  }

    return (
      <div>
        <div>
          <Header/>
        </div>
        {!isAritist &&
        <PopUpAppointmentForm info={values} setInfo = {setValues} trigger={buttonPopUp} setTrigger={setButtonPopUp}>My Popup</PopUpAppointmentForm>}

        <div className="container">
          {isAritist &&<PopUpAddGallery
            values={values}
            setValues = {setValues}
            id = {values.gallery.length+1}
            onAdd = {addNewPic}
            trigger={buttonPopUpAdd} 
            setTrigger={setButtonPopUpAdd}
          >Add</PopUpAddGallery>}
          {isAritist &&
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
            {!isAritist &&
                <Button className='btn-round btn-icon' onClick={()=> setButtonPopUp(true)}>Book an appointment</Button>}
              </Container>
            </div>
            <div className='col-6'>
              <div className='headerM'>
                <h3>My Gallery</h3>
                <div className='renderItemList'>
                    <FlatList
                      numColumns={2}
                      horizontal={false}
                      list={values.gallery}
                      renderItem={renderItem}
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