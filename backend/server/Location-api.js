const { mongoose } = require('../db/mongoose');
const { Location } = require("../models/Location");

module.exports = function (app){

  // Get location by name
  app.get("/api/locations/:country/:region", async (req, res) => {

    // check mongoose connection established
    if (mongoose.connection.readyState !== 1){
      console.log("Issue with mongoose connection");
      res.status(500).send("Internal server error");
      return;
    }

    // get locations
    try{
      const locations = Location.findOne({country: req.params.country, region: req.params.region});
      res.send(locations);
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
      var result = await Location.findOne({country: req.body.country, region: req.body.region});
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