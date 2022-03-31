import React, { Component } from 'react'
import { Header } from '../components/Header.js'
import { Container } from 'react-bootstrap'
import { Button, Form} from 'react-bootstrap'
import {Multiselect} from 'multiselect-react-dropdown';
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import ArtistCard from 'components/ArtistCard.js';
import "../assets/css/landingPage.css";
import {getLocation, getStyles, getTimeslots, getArtists} from "../apiHook/landing.js";

export class LandingPage extends Component {

  handleSubmit = async (event) =>{
      event.preventDefault();
      console.log(this.state);
      var location, timeslots, artists;
      var artistsFromTimeslots = [];
      var styles = [];
      var data = {};

      if(this.state.country && this.state.region){
        location = await getLocation({country: this.state.country, region: this.state.region});
        data["locationID"] = location._id;
      }

      if(this.state.styles.length != 0){
        for(let i = 0; i < this.state.styles.length; i++){
          const style = await getStyles({style: this.state.styles[i]['name']});
          styles.push(style[0]._id);
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
      for(let h = 0; h < artists.length; h++){
        if(!artistsFromTimeslots.includes(artists[h]._id.str)){
          artists.remove(artists[h]);
        }
      }

      console.log(artists)
      this.setState({artists: artists})
      
  }


  state = {
    country: '',
    region: '',
    start: '',
    end: '',
    styles: [],
    artists:[]
    }

  // useEffect(() => {
  //   validateDates();
  // })

  optionData = [{name:'blackline', id: 1}, 
    {name:'Japanese', id: 2}, 
    {name:'New School', id: 3},
    {name:'Realism', id: 5}, 
    {name:'Illustrative', id: 6}, 
    {name: 'Portraiture', id: 7}, 
    {name: 'Blackwork', id: 8},
    {name: 'watercolor', id: 9},
    {name:'Lettering',id: 10},
    {name:'Geometric',id: 11},
    {name:'Surrealism',id: 12},
    {name:'Microrealism',id: 13},
    {name:'Minimalism',id: 14},
    {name:'Single Line',id: 15},
    {name:'Dot Work',id: 16},];

  render(){

    const {loggedIn} = this.props;

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
                      <Multiselect options={this.optionData} displayValue="name"
                        onSelect={(val) => this.setState({styles: this.state.styles.concat(val)})}
                        onRemove={(val) => this.setState({styles: this.state.styles.remove(val)})}>
                      </Multiselect>
                  </Form.Group>

                  <Button className="mt-3 mb-3 button" id="button-14" type="submit" onClick={this.handleSubmit}>Apply</Button>
              </Form>
            <div className='cardContainer'> 
              <ArtistCard/>
              <ArtistCard/>
              <ArtistCard/>
              <ArtistCard/>
              <ArtistCard/>
              <ArtistCard/>
            </div>
          </Container>
      </div>
      )
    }

}

export default LandingPage

//timeslots api -> param
//styles -> supplied by us, stored in db originally, selected by artist, so can hardcoded?
//do we give them options to add an artstyle?