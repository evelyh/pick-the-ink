import React from 'react'
import { Header } from '../components/Header'
import { Container } from 'react-bootstrap'
import { Row } from "reactstrap";
import profilepic from '../assets/img/profilepic.jpg'
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
  Alert,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown} from 'reactstrap'
import ArtistNavBar from '../components/ArtistNavBar'

import {getImageById} from "../apiHook/image"
import {getUser} from "../apiHook/profile"
import Footer from "../components/Footer"
import {useParams} from "react-router-dom";
import {getLoginStatus} from '../apiHook/loginSignUp'

// todo: update the homelocation and profile pic
// todo: update current userID
// todo: change the redirect link

const log = console.log

function ArtistGallery() {
  let { id } = useParams();
  let myID;

  const [values, setValues] = useState({
    userName: "",
    email: "",
    following: 0,
    followers: 0,
    followerIDs: [],
    followingIDs: [],
    homeLocation: "",
    profilePic: "",
    gallery:[],
    image: "../images/patrick.jpg",
  });

  // const [dummy, setdummy] = useState(false);

  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [buttonPopUpEdit, setButtonPopUpEdit] = useState(undefined);
  // const [editShow, setEditShow] = useState(false);
  const [buttonPopUpDel, setButtonPopUpDel] = useState(undefined);
  // const [delShow, setDelShow] = useState(false);
  const [buttonPopUpAdd, setButtonPopUpAdd] = useState(false);
  // const [addShow, setAddShow] = useState(false);

  const [isUser, setIsUser] = useState(true);
  const [ifFollowed,setIfFollowed] = useState(false);

  const [mounted, setMounted] = useState(false)

  // const onDismissEdit = () => {
  //   setEditShow(!editShow);
  // }

  // const onDismissDel = () => {
  //   setDelShow(!delShow);
  // }

  // const onDismissAdd = () => {
  //   setAddShow(!addShow);
  // }



  if(!mounted){
    getLoginStatus().then(async userStatus=>{
      myID = userStatus.userId;
      if(id == undefined){
        id = myID;
      }
      if(myID == id){
        setIsUser(true);
      }

      log("fid: "+id)
      log("fmyID: "+myID)

      await getUser(id).then(async (json) => 
      { 
        // json.homeLocation = "";
        // if(json.profilePic === "" || json.profilePic === undefined){
        //   json.profilePic = "../assets/img/profilepic.jpg"
        // }
        log(json)
        json.followers = json.followerIDs.length
        json.following = json.followingIDs.length
        if(json.artistSub.homeLocation !== undefined){
          json.homeLocation = json.artistSub.homeLocation
        }
        json.gallery = [];
        for(let i = 0; i < json.artistSub.artworks.length; i++){
          console.log("i"+i)
          await getImageById(json.artistSub.artworks[i]).then(res => {
            log("image")
            log(res)
            const newImg = {
              id: res.images._id,
              title: res.images.title,
              img: res.images.img,
              desc: res.images.desc,
              created_at: res.images.created_at
            }
            json.gallery = json.gallery.concat(newImg);
            console.log(json.gallery)
          })
        }
        console.log("gallery")
        console.log(json.gallery)
        setValues(json)
        setButtonPopUp(false);
      })
    })
  }

  useEffect(() => {
    setMounted(true)
    async function a()
    {  
      await getLoginStatus().then(async (userStatus)=>{
        myID = userStatus.userId;
        if(id == undefined){
          id = myID;
        }
        if(myID == id){
          setIsUser(true);
        }
        log("id: "+id)
        log("myID: "+myID)
        await getUser(id).then(async json => 
        { 
          console.log(json)
          var resp = json;
          // resp.homeLocation = "Toronto";
          // resp.profilePic = "../assets/img/profilepic.jpg"
          // if(resp.profilePic === "" || resp.profilePic === undefined){
          //   resp.profilePic = "../assets/img/profilepic.jpg"
          // }
          if(resp.artistSub.homeLocation !== undefined){
            resp.homeLocation = resp.artistSub.homeLocation
          }
          resp.followers = resp.followerIDs.length
          resp.following = resp.followingIDs.length

          resp.gallery = [];

          for(let j = 0; j < resp.artistSub.artworks.length; j++){
            console.log("j"+j)
            await getImageById(resp.artistSub.artworks[j]).then(res => {
              const newImg = {
                id: res.images._id,
                title: res.images.title,
                img: res.images.img,
                desc: res.images.desc
              }
              resp.gallery = resp.gallery.concat(newImg);
              console.log(resp.gallery)
            })
          }
          setValues(resp)
          setButtonPopUp(false);
        }).catch(error => {
          console.log(error);
        });
      })};
      a()
  }, [buttonPopUp])


  const renderItem = (galleryPic, imgID) => {

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
            id = {imgID}
            description = {galleryPic.desc}
            setValues = {setValues}
            // setAlert = {setEditShow}
            trigger={buttonPopUpEdit} 
            setTrigger={setButtonPopUpEdit}
            // relaod = {setdummy}
            >
              Edit
          </PopUpEditGallery> 
          <PopUpDelGallery 
            id = {imgID}
            myID = {id}
            // setAlert = {setDelShow}
            trigger={buttonPopUpDel} 
            setTrigger={setButtonPopUpDel}
            >
              Del
          </PopUpDelGallery> 
            {isUser &&
              <Button id="edit" className="btn-round btn-icon" color="primary" size='sm' onClick={()=> setButtonPopUpEdit(imgID)}>Edit</Button>}
            {isUser &&
              <Button id="del" className="btn-round btn-icon" color="danger" size='sm' onClick={()=> setButtonPopUpDel(imgID)}>Delete</Button>}
        </CardBody>
      </Card>
      </div>
    );
  }

    return (
      <div>
        <div>
          <Header loggedIn={true} isArtist={true}/>
        </div>
        <div><ArtistNavBar></ArtistNavBar></div>
        {/* <Alert isOpen={delShow} color={"danger"} toggle={onDismissDel}>Deleted successfully</Alert>
        <Alert isOpen={addShow} color={"sucess"} toggle={onDismissAdd}>Added successfully</Alert>
        <Alert isOpen={editShow} color={"sucess"} toggle={onDismissEdit}>Edited successfully</Alert> */}
        {!isUser &&
        <PopUpAppointmentForm info={values} setInfo = {setValues} trigger={buttonPopUp} setTrigger={setButtonPopUp}>My Popup</PopUpAppointmentForm>}

        <div className="container">
          {isUser &&<PopUpAddGallery
            myID={id}
            // setAlert={setAddShow}
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
              {values.profilePic !== "" ?  <CardImg src={values.profilePic} id="profileCirclePic" alt='profile' />:
                 <CardImg src={profilepic} id="profileCirclePic" alt='profile' />  }  
                {/* <CardImg src={profilePic} id="profileCirclePic" alt='profile' />   */}
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

            {/* <Button
                id="bt-pro"
                size='sm'
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href='http://localhost:3000/artistprofile';
                  }}
            > profile</Button> */}
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
        <div>
          <Footer></Footer>
        </div>
      </div>
    )
}

export default ArtistGallery;