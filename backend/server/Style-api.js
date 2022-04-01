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

  //get styles by name or id
  app.get("/api/style/", async(req, res) =>{
    if (mongoose.connection.readyState !== 1){
      console.log("Issue with mongoose connection");
      res.status(500).send("Internal server error");
      return;
    }

    try{
      var result;
      if(req.query.name){
        result = await Style.find({name: req.query.name})
      }
      if(req.query.id){
        result = await Style.findById(req.query.id)
      }
      res.send(result);
    } catch (error){
      console.log(error);
      res.status(500).send("Internal Server error");
    }

  })

  app.patch("/api/style/:id", async(req, res) => {
    try{
      const style = await Style.findOneAndUpdate(
        {_id: req.params.id}, {$set: req.body}, {new: true, useFindAndModify: false})
      if (!style) {
        res.status(404).send('Resource not found')
      } else {
        res.send(style)
      }
    }catch (error){
      console.log(error);
      res.status(500).send("Internal Server error");
    }
  })

}