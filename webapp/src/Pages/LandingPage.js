import React, { Component } from 'react'
import { Header } from '../components/Header.js'
import { Footer } from '../components/Footer.js'
import { Container, Button, Form } from 'react-bootstrap'
import { Multiselect } from 'multiselect-react-dropdown';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import "../assets/css/landingPage.css";
import {getAllStyles, getLocation, getTimeslots, getArtists} from "../apiHook/landing.js";
import { getImageById } from '../apiHook/image.js';
import { getLoginStatus } from '../apiHook/loginSignUp.js';

export class LandingPage extends Component {

  state = {
    country: '',
    region: '',
    start: '',
    end: '',
    styles: [],
    artists:[],
    allStyles: [],
    imageObjList: []
  }

  country = ["Canada", "United States"]

  handleSubmit = async (event) =>{
      event.preventDefault();
      var location, timeslots, artists;
      var artistsFromTimeslots = [];
      var styles = [];
      var data = {};

      if(this.state.country && this.state.region){
        location = await getLocation({country: this.state.country, region: this.state.region});
        data["locationID"] = location._id;
      }

      if(this.state.styles.length !== 0){
        for(let i = 0; i < this.state.styles.length; i++){
          styles.push(this.state.styles[i]._id);
        }
          data["styleIDs"] = styles;
      }

      if(this.state.start && this.state.end){
        timeslots = await getTimeslots({start: this.state.start, end:this.state.end});
        for(let j = 0; j < timeslots.length; j++){
          if(!artistsFromTimeslots.includes(timeslots[j].artistID)){
            artistsFromTimeslots.push(timeslots[j].artistID);
          }
        }
      }
      
      artists = await getArtists(data);
      if(artistsFromTimeslots.length !== 0){
        for(let h = 0; h < artists.length; h++){
          if(!artistsFromTimeslots.includes(artists[h]._id.str)){
            var ind = artists.indexOf(artists[h]);
            artists.splice(ind, 1);
          }
        }
      }
      this.setState({artists: artists})
      
  }

  componentWillMount = async() =>{
    var allStyles = await getAllStyles();
    var artists = await getArtists({});
    this.setState({allStyles: allStyles, artists: artists})

    var imgobjs = [];
    var artlen = this.state.artists.length;
    for(let i = 0; i < artlen; i++){
      var imgids = this.state.artists[i].artistSub.artworks
      var imglen = imgids.length
      imgobjs.push([]);
      for(let j = 0; j < imglen; j++){
        var img = await getImageById(imgids[j]);
        imgobjs[i].push(img)
      }
    }
    this.setState({imageObjList: imgobjs});

  }

  render(){
    const {loggedIn} = this.props;
    var imageList = {};
    var artlen = this.state.artists.length;
    if(this.state.imageObjList.length !== 0){
      for(let i = 0; i < artlen; i++){
        var list = (this.state.imageObjList)[i]
        imageList[(this.state.artists[i]).userName] = list.map((image) =>
            <div key={image.images.img}>
              <img src={image.images.img} title={image.images.title} alt={image.images.desc}/>
            </div>)
      }
    }
    const hostURL = "http://localhost:3000"
    const artistProfile = hostURL + "/artistprofile/"
    const artistList = this.state.artists.map((artist) => 
        <div className="card" id="card" key={artist.userName}>
          <a id="cardname" style={{fontWeight: "bold", fontSize: "15px"}} href={artistProfile+artist._id}> @{artist.userName} </a>
          <p className='mb-3 styles'style={{fontSize: "14px"}} > {artist.comment} </p>
          <Carousel id='carousel'>
              {imageList[artist.userName]}
          </Carousel>
        </div>)

    return (
      <div>
        <div><Header loggedIn={loggedIn}/> </div>
        <Container>
              <h4 className="mb-4"><a id='title'> Welcome to PickINK! Get started by finding the right Tattoo Artists for you. </a></h4>
            <Form className='form-horizontal'>
              <div className='row'>
                <Form.Group className='col-3 mb-3' >                 
                <Form.Label> Location of artists: </Form.Label>
                <CountryDropdown
                        whitelist = {['CA', 'US']}
                        className='countrySelector'
                        value={this.state.country}
                        onChange={(val) => this.setState({country: val})}></CountryDropdown> 
                </Form.Group>
                <Form.Group className='col-5 mb-3'>
                <RegionDropdown
                      blankOptionLabel="Select Region"
                      blacklist={{US: ["Armed Forces Americas", "Armed Forces Pacific", "Armed Forces Europe, Canada, Africa and Middle East"]}}
                      className='countrySelector'
                      country={this.state.country}
                      value={this.state.region}
                      onChange={(val) => this.setState({region: val})}/>
                </Form.Group>
              </div>
                <Form.Group className="col-3 formField" >
                  <Form.Text> Choose the time period you're looking to book</Form.Text>
                </Form.Group>

                <div className = 'row'>
                  <Form.Group className="col-3 formField" >
                      <Form.Label>Start:</Form.Label>
                      <Form.Control type="date" placeholder='Start Date' onChange={(val) => this.setState({start: val.target.value})}/>
                  </Form.Group>

                  <Form.Group className="col-3 formField" >
                      <Form.Label>End:</Form.Label>
                      <Form.Control type="date" placeholder='End Date' onChange={(val) => this.setState({end: val.target.value})}/>
                  </Form.Group>
                  
                  </div>

                  <Form.Group className="col-4 mb-3 formField" >
                      <Form.Label>Styles:</Form.Label>
                      <Multiselect options={this.state.allStyles} displayValue="name"
                        onSelect={(val) => this.setState({styles: val})}
                        onRemove={(val) => this.setState({styles: val})}>
                      </Multiselect>
                  </Form.Group>

                  <Button className="mt-3 mb-3 button" id="button-14" type="submit" onClick={this.handleSubmit}>Apply</Button>
              </Form>
            <div className='cardContainer'> 
                {artistList}
            </div>

            <div> <Footer/> </div>
          </Container>


      </div>
      )
    }

}

export default LandingPage