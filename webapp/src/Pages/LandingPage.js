import React from 'react'
import { Header } from '../components/header'
import { Container } from 'react-bootstrap'
import { Button, Form} from 'react-bootstrap'
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import "../assets/css/landingPage.css";

function LandingPage() {

  var country;
  var region;

  const selectCountry = (val) => {
    country = val;
  }

  const selectRegion = (val) => {
    region = val;
  }

    return (
      <div>
        <div><Header/> </div>
        <Container>
              <h4 className="mb-3">Add filter to find the right artists for you </h4>
            <Form>
              <div className='row'>
                <div className='col-5 mb-3' >                 
                <h7> Country: </h7>
                  <CountryDropdown
                        value={country}
                        onChange={(val) => selectCountry(val)}/> 
                </div>
                <div className='col-5 mb-3'>
                 <h7> Region: </h7>
                  <RegionDropdown
                      country={country}
                      value={region}
                      onChange={(val) => selectRegion(val)}/>
                </div>
              </div>
                <div className = 'row'>
                  <Form.Group className="mb-3 col-3" >
                      <Form.Label>Start:</Form.Label>
                      <Form.Control type="date"/>
                  </Form.Group>

                  <Form.Group className="mb-3 col-3" >
                      <Form.Label>End:</Form.Label>
                      <Form.Control type="date"/>
                  </Form.Group>
                  </div>

                  <Form.Group className="mb-3" >
                      <Form.Label>Styles:</Form.Label>
                      {["Watercolor", "Fine line", "Cartoon"].map((label) => (
                      <Form.Check type='radio' label={label}/>))}
                  </Form.Group>

                  <Button id="button-16" type="submit" >Apply</Button>
              </Form>
          </Container>
          <Container>
            <div className='cardContainer'> 
            
            </div>
          </Container>
      </div>
    )

}

export default LandingPage