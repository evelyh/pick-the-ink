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
import _ from "lodash"
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
    homeLocation: "Toronto",
    image: "../images/profilepic.jpg",
    gallery:[
      {id:0, title: "My BF", description: "Patrick and me", img: pic1},
      {id:1, title: "Great time", description: "Patrick and me", img: pic2}],
  });

  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [buttonPopUpEdit, setButtonPopUpEdit] = useState(undefined);
  const [buttonPopUpDel, setButtonPopUpDel] = useState(undefined);
  const [buttonPopUpAdd, setButtonPopUpAdd] = useState(false);

  const [isUser] = useState(true);

  const deleteById = (id, event) => {
    event.preventDefault();
    setValues({...values, gallery:_.cloneDeep(values.gallery.filter((item)=>{
        return item.id !== id
    }))})
    console.log(_.cloneDeep(values.gallery.filter((item)=>{
      return item.id !== id
  })))
    console.log(values.gallery)
  }

  const addNewPic = (newPic) => {
    const newGallery = values.gallery.concat(newPic);
    setValues({gallery: newGallery});
  }

  const renderItem = (galleryPic, index) => {

    return(
      <div key={galleryPic.id} className="cardItem">
      <Card style={{width: '20rem'}}>
        <CardImg id="cardImg" className='galleryPics' top src={galleryPic.img} alt="..."/>
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
            {isUser &&
              <Button id="edit" className="btn-round btn-icon" color="primary" size='sm' onClick={()=> setButtonPopUpEdit(index)}>Edit</Button>}
            {isUser &&
              <Button id="del" className="btn-round btn-icon" color="danger" size='sm' onClick={()=> setButtonPopUpDel(index)}>Delete</Button>}
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
            values={values}
            setValues = {setValues}
            id = {values.gallery.length+1}
            onAdd = {addNewPic}
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