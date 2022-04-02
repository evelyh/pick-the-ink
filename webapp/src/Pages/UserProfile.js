import React from 'react'
import {useParams} from "react-router-dom";
import { Header } from '../components/Header'
import { Container, Alert, CloseButton, ListGroup} from 'react-bootstrap'
import gary from '../assets/img/gary.jpg'
import krabs from '../assets/img/krabs.jpg'
import profilepic from '../assets/img/profilepic.jpg'
import '../assets/css/userProfile.css'
import PopUpProfileForm from '../components/PopUpProfileForm'
import { useState, useEffect } from 'react'
import { Card, CardBody, CardImg,CardText,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,Button} from 'reactstrap'
import {getStyleById, getUser, postUser, getUserFollowing, getUserFollower} from "../apiHook/profile"
import { uid } from 'react-uid';




function UserProfile() {
    const { id } = useParams();
    const myid = "624769ffa025c967d7d132a0";
    
    let isUser =false;
    if(myid == id){
      isUser = true;
    }else{
      isUser = false;
    }

    // Should get this data from the server
    const [buttonPopUp, setButtonPopUp] = useState(false);
    
    
    const [values, setValues] = useState(
      {
      profilePic:"",
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      birthDate: "",
      phoneNum : "",
      favoriteStyles: [],
      image: "../images/patrick.jpg",
      isArtist: false,
      followingIDs:[],
      followerIDs:[],
      comment:""}
      );
    

    

    let lst = [];
    const [success,setSuccess] = useState(false);
    useEffect(()=>{
      getUser(id).then(json => 
        { console.log(json)
          let data = json;
          const favoriteStyles = [];
          document.getElementById("style").innerHTML = "";
          
          
          for(const s_id in data.favoriteStyles){
            getStyleById(data.favoriteStyles[s_id]).then((ele)=> 
            {favoriteStyles[s_id] = ele;
              const li = document.createElement("li");
              li.innerText = ele.name;
              document.getElementById("style").appendChild(li);
            });
          }
          data.favoriteStyles = favoriteStyles
          data.birthDate = data.birthDate.slice(0,10);

          setValues(data); 
          console.log(values.followerIDs)
          
        });
      
    }, [buttonPopUp])
    

    const [following, setFollowing] = useState();
    useEffect(()=>{
        getUserFollowing(id).then((json)=>{
          console.log(json)
          setFollowing(json)
        })
        console.log(following, 1111)
        
    },[success])

    const [follower, setFollower] = useState();
    useEffect(()=>{
        getUserFollower(id).then((json)=>{
          console.log(json)
          setFollower(json)
        })
        console.log(follower, 2222)
        
    },[success])

    const onDismiss = ()=>{
      setSuccess(false);
    };


    return (
      <div>
       
        <div>
          <Header loggedIn={true}/>
        </div>
        <PopUpProfileForm info={values} setInfo = {setValues} success={success} setSuccess={setSuccess} trigger={buttonPopUp} setTrigger={setButtonPopUp}>My Popup</PopUpProfileForm>
        <div className="container">
          <div className="row">
            <div className="col-3">
            <Card id="profileCard" style={{width: '20rem'}}>
              <CardBody>  
                {values.profilePic?  <CardImg src={values.profilePic} id="profileCirclePic" alt='profile' />  :
                 <CardImg src={profilepic} id="profileCirclePic" alt='profile' />  }  
              <h5>{values.userName}</h5>
              <CardText>{values.comment}</CardText>
            <UncontrolledDropdown className="btn-group" id = "followingDD">
             <DropdownToggle tag="a"
              data-toggle="dropdown">
              Following: {values.followingIDs.length}
              </DropdownToggle>
              <DropdownMenu >
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

                {isUser ? <label className="col-sm-3 col-form-label col-form-label">Date of Birth:</label>:null}
                {isUser ? 
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.birthDate}</label>
                </div>
                :null}
                
                {isUser ? <label className="col-sm-3 col-form-label col-form-label">Phone:</label>:null}
                {isUser ? 
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.phoneNum}</label>
                </div>
                :null}

                <label className="col-sm-3 col-form-label col-form-label">Favorite styles:</label>
                {values.favoriteStyles ?
                <div id = "style" className="col-sm-7"> </div>
                :null}
              </div>
              { isUser ? <Button size='sm' onClick={()=> setButtonPopUp(true)}>Edit your profile</Button> :null }
              </Container>
            </div>
          </div>
        </div>
      </div>
      )
  }

export default UserProfile