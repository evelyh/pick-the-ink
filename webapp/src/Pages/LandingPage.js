import React, { Component } from 'react'
import { Header } from '../components/Header.js'
import { Container, Button, Form } from 'react-bootstrap'
import { Multiselect } from 'multiselect-react-dropdown';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import "../assets/css/landingPage.css";
import {getAllStyles, getLocation, getStyles, getTimeslots, getArtists} from "../apiHook/landing.js";
import { getImageById } from '../apiHook/image.js';
import pic1 from '../assets/img/gallery_pic2.jpg'

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

      if(this.state.styles){
        for(let i = 0; i < this.state.styles.length; i++){
          styles.push(this.state.styles[0]._id);
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

    var imgobjs = new Array();
    var artlen = this.state.artists.length;
    for(let i = 0; i < artlen; i++){
      var imgids = this.state.artists[i].artistSub.artworks
      var imglen = imgids.length
      imgobjs.push(new Array());
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
    if(this.state.imageObjList.length != 0){
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
        <div className="card" key={artist.userName}>
          <a className="username" href={artistProfile+artist._id} > {artist.userName} </a>
          <p className='mb-3'> {artist.comment} </p>
          <Carousel class='carousel'>
              {imageList[artist.userName]}
          </Carousel>
        </div>)

    return (
      <div>
        <div><Header loggedIn={loggedIn}/> </div>
        <Container>
              <h4 className="mb-4"><a id='title'> Welcome to PickINK! Get started by finding the right Artists for you. </a></h4>
            <Form>
              <div className='row'>
                <Form.Group className='col-4 mb-3' >                 
                <Form.Label> Country: </Form.Label>
                <CountryDropdown
                        className='countrySelector'
                        value={this.state.country}
                        onChange={(val) => this.setState({country: val})}></CountryDropdown> 
                </Form.Group>
                <Form.Group className='col-4 mb-3'>
                 <Form.Label> Region: </Form.Label>
                <RegionDropdown
                      className='countrySelector'
                      country={this.state.country}
                      value={this.state.region}
                      onChange={(val) => this.setState({region: val})}/>
                </Form.Group>
              </div>
                <div className = 'row'>
                  <Form.Group className="col-3 formField" >
                      <Form.Label>Start:</Form.Label>
                      <Form.Control type="date" onChange={(val) => this.setState({start: val.target.value})}/>
                  </Form.Group>

                  <Form.Group className="col-3 formField" >
                      <Form.Label>End:</Form.Label>
                      <Form.Control type="date" onChange={(val) => this.setState({end: val.target.value})}/>
                  </Form.Group>
                  </div>

                  <Form.Group className="col-4 formField" >
                      <Form.Label>Styles:</Form.Label>
                      <Multiselect options={this.state.allStyles} displayValue="name"
                        onSelect={(val) => this.setState({styles: this.state.styles.concat(val)})}
                        onRemove={(val) => this.setState({styles: this.state.styles.remove(val)})}>
                      </Multiselect>
                  </Form.Group>

                  <Button className="mt-3 mb-3 button" id="button-14" type="submit" onClick={this.handleSubmit}>Apply</Button>
              </Form>
            <div className='cardContainer'> 
                {artistList}
            </div>
          </Container>
      </div>
      )
    }

}

export default LandingPage