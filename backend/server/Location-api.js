const { mongoose } = require('../db/mongoose');
const { Location } = require("../models/Location");

module.exports = function (app){

  // Get all locations
  app.get("/api/locations", async (req, res) => {

    // check mongoose connection established
    if (mongoose.connection.readyState !== 1){
      console.log("Issue with mongoose connection");
      res.status(500).send("Internal server error");
      return;
    }

    // get locations
    try{
      const locations = Location.find();
      res.send(locations);
    } catch (error){
      console.log(error);
      res.status(500).send("Internal Server error");
    }

  })

}