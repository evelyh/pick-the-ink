const { ObjectID } = require('mongodb')
const { mongoose } = require('../db/mongoose');
const { Admin } = require("../models/Admin");

module.exports = function (app){

  function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
  }

  app.post("/api/admin", async(req, res) =>{
    try{
      const admin = new Admin({
        userName: req.body.userName,
        password: req.body.password
      })
      const result = await admin.save()
      res.send(result);
    }catch (error){
      console.log(error);
      if (isMongoError(error)){
        res.status(500).send("Internal server error");
      } else{
        res.status(400).send("Bad request");
      }
    }
    
  })

  app.use("/admin/login", async (req, res) =>{
    try{
      const admin = await Admin.findOne({userName: req.body.username, password: req.body.password}, function(err,obj) { } );
      if(!admin){
        res.send({token: null});
      }else{
        res.send({token: 'loggedIn'})
      }
    }catch (error){
      console.log(error);
      if (isMongoError(error)){
        res.status(500).send("Internal server error");
      } else{
        res.status(400).send("Bad request");
      }
    }

  })

  // Get all admin / by username / by user id
  // todo: add middleware to check authorization to access info
  app.get("/api/admin", async (req, res) => {

    // check mongoose connection established
    if (mongoose.connection.readyState !== 1){
      console.log("Issue with mongoose connection");
      res.status(500).send("Internal server error");
      return;
    }

    // get admin info
    try{
      if (req.body.userID){
        const admin = await Admin.find({userID: req.body.userID});
        res.send({ admin });
      } else if (req.body.userName){
        const admin = await Admin.find({userName: req.body.userName});
        res.send({ admin });
      } else{
        const admins = await Admin.find();
        res.send({ admins });
      }
    } catch (error){
      console.log(error);
      if (isMongoError(error)){
        res.status(500).send("Internal server error");
      } else{
        res.status(400).send("Bad request");
      }
    }

  })

  // update some fields in admin by userID or userName
  // todo: add middleware to check if authorized user
  app.patch("/api/admin", async (req, res) => {

    // check mongoose connection established
    if (mongoose.connection.readyState !== 1){
      console.log("Issue with mongoose connection");
      res.status(500).send("Internal server error");
      return;
    }

    try{
      if (req.body.userID){
        const admin = await Admin.findOneAndUpdate({userID: req.body.userID},
          {$set: req.body}, {new: true, useFindAndModify: false});
        if (!admin){
          res.status(400).send("Resource not found");
        } else{
          res.send({ admin });
        }
      } else if (req.body.userName){
        const admin = await Admin.findOneAndUpdate({userName: req.body.userName},
          {$set: req.body}, {new: true, useFindAndModify: false});
        if (!admin){
          res.status(400).send("Resource not found");
        } else{
          res.send({ admin });
        }
      } else{
        res.status(400).send("Bad request");
      }
    } catch (error){
      console.log(error);
      if (isMongoError(error)){
        res.status(500).send("Internal server error");
      } else{
        res.status(400).send("Bad request");
      }
    }


  })


}