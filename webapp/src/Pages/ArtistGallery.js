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
import Footer from "../components/Footer";
import {useParams} from "react-router-dom";
import {getLoginStatus} from '../apiHook/loginSignUp'
import {getStyleById, getUser, getUserFollowing, getUserFollower, followUser, unfollowUser} from "../apiHook/profile"

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
    followerIDs: [],
    followingIDs: [],
    homeLocation: "",
    profilePic: "",
    gallery:[],
    image: "../images/patrick.jpg",
    comment:"",
    isArtist: true,
    artistSub: undefined
  });


  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [buttonPopUpEdit, setButtonPopUpEdit] = useState(undefined);
  const [buttonPopUpDel, setButtonPopUpDel] = useState(undefined);
  const [buttonPopUpAdd, setButtonPopUpAdd] = useState(false);
  const [buttonPopUpBook, setButtonPopUpBook] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [ifFollowed,setIfFollowed] = useState(false);
  const [follower, setFollower] = useState();
  const [following, setFollowing] = useState();
  const [success,setSuccess] = useState(false);

  const [mounted, setMounted] = useState(false)

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

        if(json.followerIDs.includes(myID)){
          setIfFollowed(true);
        }else{
          setIfFollowed(false);
        }
        console.log(values.followerIDs)
      })
    })
  }

  const [username, setUsername] = useState("");
  useEffect(() => {
    setMounted(true)
    async function a()
    {  
      await getLoginStatus().then(async (userStatus)=>{
        myID = userStatus.userId;
        if(id == undefined){
          id = myID;
          setUsername(this.values.userName)
        }
        if(myID == id){
          setIsUser(true);
          setUsername(this.values.userName)
        }else{
          if(userStatus.loggedIn){
            getUser(userStatus.userId).then((json)=>setUsername(json.userName))
          }
        }

        getUserFollowing(id).then((res)=>{
          setFollowing(res)
        })

        getUserFollower(id).then((res)=>{
          setFollower(res)
        }) 
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
          if(resp.followerIDs.includes(myID)){
            setIfFollowed(true);
          }else{
            setIfFollowed(false);
          }
          console.log(values.followerIDs)
        }).catch(error => {
          console.log(error);
        });
      })};
      a()
  }, [buttonPopUp, success])

  const addFollow = ()=>{
    getLoginStatus().then(json=>{
      if(json.loggedIn){
        console.log(id, json.userId, 2222222222);
        followUser(id, json.userId);
        setIfFollowed(true);
      }
    })
  }
  const removeFollow = ()=>{
    getLoginStatus().then(json=>{
      if(json.loggedIn){
        unfollowUser(id, json.userId);
        setIfFollowed(false);
      }
    })
  }

  const renderItem = (galleryPic, imgID) => {

    return(
      <div key={galleryPic.id} className="cardItem">
      <Card id="profilecard">
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
          <Header loggedIn={true} isArtist={true} userName = {username}/>
        </div>
        <div><ArtistNavBar></ArtistNavBar></div>
        {/* <Alert isOpen={delShow} color={"danger"} toggle={onDismissDel}>Deleted successfully</Alert>
        <Alert isOpen={addShow} color={"sucess"} toggle={onDismissAdd}>Added successfully</Alert>
        <Alert isOpen={editShow} color={"sucess"} toggle={onDismissEdit}>Edited successfully</Alert> */}
        {isUser ? null : <PopUpAppointmentForm 
                            info={values} 
                            setInfo = {setValues} 
                            artistId={id}
                            trigger={buttonPopUpBook} 
                            setTrigger={setButtonPopUpBook}>My Popup
                          </PopUpAppointmentForm>}
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
                <h5>{values.userName}
                  {!isUser? (
                    ifFollowed?<Button id='followButton' onClick={removeFollow}>Unfollow</Button>
                    :<Button id='followButton' onClick={addFollow}>Follow</Button>
                  ) 
                  :null}
                </h5>
                <CardText>{values.comment}</CardText>
                <UncontrolledDropdown className="btn-group" id="followingDD">
                  <DropdownToggle tag="a"
                    data-toggle="dropdown">
                    Following: {values.followingIDs.length}
                  </DropdownToggle>
                  <DropdownMenu>
                    {following? following.map(element => (
                      <DropdownItem tag="a" href={element["uLink"]} key={element["uLink"]}>
                        <img id="profileDropdownPic" src={element["uPic"]? element["uPic"]:profilepic} alt={element["uName"]} ></img>
                          {element["uName"]}
                      </DropdownItem>)):null}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <span> </span>
                <UncontrolledDropdown className="btn-group">
                  <DropdownToggle tag="a"
                    data-toggle="dropdown">
                    Followers: {values.followerIDs.length}
                  </DropdownToggle>
                  <DropdownMenu >
                  {follower? follower.map(element => (
                    <DropdownItem tag="a" href={element["uLink"]} key={element["uLink"]}>
                      <img id="profileDropdownPic" src={element["uPic"]? element["uPic"]:profilepic} alt={element["uName"]} ></img>
                        {element["uName"]}
                    </DropdownItem>)):null}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardBody>
            </Card>
            {isUser? null: <Button size='sm'
                type="button" onClick={()=> setButtonPopUpBook(true)}>Book an appointment</Button>}
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
                        // minColumnWidth: "400px",
                        // gridGap: "100px"
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