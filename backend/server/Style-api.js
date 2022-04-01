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
      const styles = await Style.find();
      res.send(styles);
    } catch (error){
      console.log(error);
      res.status(500).send("Internal Server error");
    }

  })

  //create new style
  app.post("/api/styles", async (req, res) => {
        const style = new Style({
          name: req.body.name
        })
        const result = await style.save()
        res.send(result)
    })

  //get styles by name
  app.get("/api/style/", async(req, res) =>{
    if (mongoose.connection.readyState !== 1){
      console.log("Issue with mongoose connection");
      res.status(500).send("Internal server error");
      return;
    }

    try{
      var result = await Style.find({name: req.query.name});
      res.send(result);
    } catch (error){
      console.log(error);
      res.status(500).send("Internal Server error");
    }

  })

}