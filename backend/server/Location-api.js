const { mongoose } = require('../db/mongoose');
const { Location } = require("../models/Location");
const { ObjectID } = require('mongodb')

module.exports = function (app){
  // Get location by name or find all
  app.get("/api/locations", async (req, res) => {
    console.log(req.body)
    // check mongoose connection established
    if (mongoose.connection.readyState !== 1){
      console.log("Issue with mongoose connection");
      res.status(500).send("Internal server error");
      return;
    }

    // get locations
    try{
      var location;
      if(Object.keys(req.query).length == 2){
        let country = req.query.country;
        let region = req.query.region;
        location = await Location.findOne({country: country, region: region}, function(err,obj) { } );
      }else{
        location = await Location.find();
      }
      res.send(location);
    } catch (error){
      console.log(error);
      res.status(500).send("Internal Server error");
    }

  })

  // get location by ID
  app.get("/api/locations/:id",async(req, res) => {
    console.log(req.params);

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      res.status(404).send('Resource not found')
      return;
    }

    if (mongoose.connection.readyState !== 1){
      console.log("Issue with mongoose connection");
      res.status(500).send("Internal server error");
      return;
    }
    console.log(id)

    try{
      Location.findById(id).then(
        location => {
            console.log(location)
            res.send({ location }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );

    }catch(error){
      console.log(error);
      res.status(500).send("Internal Server error");
    }
  })


  //store an associated location, if not existed yet, create one
  app.post("/api/locations", async(req, res) =>{
    if (mongoose.connection.readyState !== 1){
      console.log("Issue with mongoose connection");
      res.status(500).send("Internal server error");
      return;
    }

    try{
      var result = await Location.findOne({country: req.body.country, region: req.body.region}, function(err,obj) { console.log(obj); });
      if(result == null){
      const location =  new Location({
            country: req.body.country,
            region: req.body.region,
        });
          result = await location.save();
      }
      res.send(result);
    } catch (error){
      console.log(error);
      res.status(500).send("Internal Server error");
    }

  })


}