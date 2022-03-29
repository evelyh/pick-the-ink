const { mongoose } = require('../db/mongoose');
const {Style} = require("../models/Style");

module.exports = function (app){

  // Get all styles
  app.get("/api/styles", async (req, res) => {

    // check mongoose connection established
    if (mongoose.connection.readyState !== 1){
      console.log("Issue with mongoose connection");
      res.status(500).send("Internal server error");
      return;
    }

    // get styles
    try{
      const styles = Style.find();
      res.send(styles);
    } catch (error){
      console.log(error);
      res.status(500).send("Internal Server error");
    }

  })

  //get styles by name
  app.get("/api/styles/:name", async(req, res) =>{
    if (mongoose.connection.readyState !== 1){
      console.log("Issue with mongoose connection");
      res.status(500).send("Internal server error");
      return;
    }

    try{
      var result = await Style.findOne({styleName: req.params.styleName});
      res.send(result);
    } catch (error){
      console.log(error);
      res.status(500).send("Internal Server error");
    }

  })

}