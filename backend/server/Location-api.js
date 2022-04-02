const { mongoose } = require('../db/mongoose');
const { Location } = require("../models/Location");

module.exports = function (app){

  // Get location by name or find all
  app.get("/api/locations", async (req, res) => {

    // check mongoose connection established
    if (mongoose.connection.readyState !== 1){
      console.log("Issue with mongoose connection");
      res.status(500).send("Internal server error");
      return;
    }

    // get locations
    try{
      var location;
      if(Object.keys(req.query).length != 0){
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