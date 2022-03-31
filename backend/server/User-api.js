const log = console.log;
const { ObjectID } = require('mongodb')
const { mongoose } = require('../db/mongoose')
const { User } = require('../models/User')
const {mongoChecker} = require("./mongo-helpers");

module.exports = function(app) {
  function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
  }

  // create user -> sign up
  app.post('/api/users', async (req, res) => {
    if (mongoose.connection.readyState != 1) {
      log('There is issue to mongoose connection')
      res.status(500).send('Internal server error')
      return;
    }
  })

  //create user
  app.post('/api/users', async (req, res) => {
      if (mongoose.connection.readyState != 1) {
          log('There is issue to mongoose connection')
          res.status(500).send('Internal server error')
          return;
      }   
  
      try {
          const user = new User({
              userName: req.body.userName,
              password: req.body.password,
              email:req.body.email,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              birthDate: req.body.birthDate,
              isArtist: req.body.isArtist
          })
          if(user.isArtist){
              user.artistSub = {
                  homeLocation: mongoose.Types.ObjectId(req.body.artistSub.homeLocation),
                  artistSub: mongoose.Types.ObjectId(req.body.artistSub.artStyles),
                  license: mongoose.Types.ObjectId(req.body.artistSub.license),
                  physicalID: mongoose.Types.ObjectId(req.body.artistSub.physicalID)
              }
          }else{
              user.artistSub = null;
          }

          console.log(user);
          
          const result = await user.save()	
          res.send(result)
      } catch(error) {
          log(error) 
          if (isMongoError(error)) 
          {
              res.status(500).send('Internal server error')
          } else {
              res.status(400).send('Bad Request')
          }
      }
  })

  //get all users
  app.get('/api/users', async (req, res) => {
    if (mongoose.connection.readyState != 1) {
      log('There is issue to mongoose connection')
      res.status(500).send('Internal server error')
      return;
    }

    try {
      const user = await User.find()
      res.send(user)
    } catch(error) {
      log(error)
      res.status(500).send("Internal Server Error")
    }
  })

  //search artists by conditions
  app.get("/api/findArtists", async(req, res) => {
    var location, styles;
    var data = {isArtist: true};
    if(req.query.location){
      location = mongoose.Types.ObjectId(req.query.location);
      data["artistSub.homeLocation"] = location;
    }
    if(req.query.style){
      styles = JSON.parse(req.query.style);
      for(let i = 0; i < styles.length; i++){
        styles[i] = mongoose.Types.ObjectId(styles[i]);
      }
      data["artistSub.artStyles"] = styles;
    }
      try{
          const result = await User.find(data);
          if (!result) {
              res.status(404).send('Resource not found')
          } else { 
              res.send({result})
          }   
      }catch(error) {
          log(error)
          res.status(500).send('Internal Server Error')
      }
  })

  //get user by id
  app.get("/api/users/:id", async(req, res) => {
    if (mongoose.connection.readyState != 1) {
      log('There is issue to mongoose connection')
      res.status(500).send('Internal server error')
      return;
    }

    const id = req.params.id;

    try{
      const result = await User.findById(id);
      if (!result) {
        res.status(404).send('Resource not found')
      } else {
        res.send({result})
      }
    }catch(error) {
      log(error)
      res.status(500).send('Internal Server Error')
    }
  })

  //modify user info by id
  app.patch("/api/users/:id", async(req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
      res.status(404).send()
      return;  // so that we don't run the rest of the handler.
    }

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
      log('Issue with mongoose connection')
      res.status(500).send('Internal server error')
      return;
    }

    try {
      const user = await User.findOneAndUpdate({_id: id}, {$set: req.body}, {new: true, useFindAndModify: false})
      if (!user) {
        res.status(404).send('Resource not found')
      } else {
        res.send(user)
      }
    } catch (error) {
      log(error)
      if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
        res.status(500).send('Internal server error')
      } else {
        res.status(400).send('Bad Request') // bad request for changing the student.
      }
    }
  })

  //delete user by id
  app.delete("/api/users/:id", async(req, res) => {
    const id = req.params.id

    // Validate id
    if (!ObjectID.isValid(id)) {
      res.status(404).send('Resource not found')
      return;
    }

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
      log('Issue with mongoose connection')
      res.status(500).send('Internal server error')
      return;
    }

    try {
      const user = await User.findByIdAndRemove(id, {new: true, useFindAndModify: false})
      if (!user) {
        res.status(404).send()
      } else {
        res.send({user})
      }
    } catch(error) {
      log(error)
      res.status(500).send()
    }
  })

  ///////////////////

  // Login and Logout routes

  // login users
  app.post("/users/login", mongoChecker, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
      const user = await User.findByUsernamePassword(username, password);
      if (!user){
        res.status(400).send("bad request");
      } else{
        // add user id and username to session
        req.session.user = user._id;
        req.session.username = user.userName;
        req.session.userType = user.userType;
        res.status(200).send("Login successful");
      }
    } catch (error){
      // redirect to log in if it cannot log in
      if (isMongoError(error)){
        res.status(500).send("internal server error");
      } else{
        console.log(error);
        res.status(400).send("bad request");
      }
    }
  })

  // for checking login status
  app.get("/users/login", (req, res) => {
    if (req.session.user){
      res.send({"loggedIn": true, user: req.session.user, userType: req.session.userType});
    } else{
      res.send({"loggedIn": false});
    }
  })

  // logout users
  app.get("/users/logout", mongoChecker, async (req, res) => {
    // remove session
    req.session.destroy((error) => {
      if (error){
        res.status(500).send(error);
      } else {
        res.status(200).send("logout successful");
      }
    })
  })

}