// helpers for authentication
// taken from lecture code

const {User} = require("../models/User");
const {Admin} = require("../models/Admin");

module.exports = {
  authenticateUser: (req, res, next) => {
    if (req.session.user){
      User.findById(req.session.user).then((user) => {
        if (!user){
          return Promise.reject();
        } else{
          req.user = user;
          next();
        }
      }).catch((error) => {
        res.status(401).send("unauthorized");
      })
    } else{
      res.status(401).send("unauthorized");
    }
  },

  authenticateArtist: (req, res, next) => {
    if (req.session.user){
      User.find({"id_": req.session.user, "isArtist": true}).then((user) => {
        if (!user){
          return Promise.reject();
        } else{
          req.user = user;
          next();
        }
      }).catch((error) => {
        res.status(401).send("unauthorized");
      })
    } else{
      res.status(401).send("unauthorized");
    }
  },

  authenticateAdmin: (req, res, next) => {
    if (req.session.user){
      Admin.findById(req.session.user).then((user) => {
        if (!user){
          return Promise.reject();
        } else{
          req.user = user;
          next();
        }
      }).catch((error) => {
        res.status(401).send("unauthorized");
      })
    } else{
      res.status(401).send("unauthorized");
    }
  }

  // todo: we might or might not need this
  // sessionChecker: (req, res, next) => {
  //   if (req.session.user){
  //   } else{
  //     next();
  //   }
  // }

}