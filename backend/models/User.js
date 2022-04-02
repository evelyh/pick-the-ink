/* User mongoose model */
const mongoose = require('mongoose')
const validator = require("validator");
const bcrypt = require("bcryptjs");

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const ArtistSchema = new mongoose.Schema({
  imageIDs: {
    type: [mongoose.SchemaTypes.ObjectId],
    required: false,
    ref: "Image"
  },
  homeLocation: {
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    ref: "Location"
  },
  artStyles: {
    type: [mongoose.SchemaTypes.ObjectId],
    required: false,
    ref: "Style"
  },
  bookingCancellable: {
    type: Boolean,
    required: true,
    default: true
  },
  bookingModifiable: {
    type: Boolean,
    required: true,
    default: true
  },
  physicalID:{
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Image"
  },
  license: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Image"
  },
  approved: {
    type: Boolean,
    required: true,
    default: false
  }
});

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlegth: 1
  },
  password: {
    type: String,
    required: true,
    minlegth: 1
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validateEmail, "The email address is in valid"]
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
    minlegth: 1
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    minlegth: 1
  },
  birthDate: {
    type: Date,
    required: true
  },
  phoneNum: {
    type: String,
    required: false
  },
  followingIDs: {
    type: [mongoose.SchemaTypes.ObjectId],
    required: false,
    ref: "User"
  },
  followerIDs: {
    type: [mongoose.SchemaTypes.ObjectId],
    required: false,
    ref: "User"
  },
  favoriteStyles: {
    type: [mongoose.SchemaTypes.ObjectId],
    required: false,
    ref: "Style"
  },
  bookingList: {
    type: [mongoose.SchemaTypes.ObjectId],
    required: false,
    ref: "Booking"
  },
  isArtist: {
    type: Boolean,
    required: true,
    default: false,
  },
  artistSub: {
    type: ArtistSchema,
    required: false,
  }
})


// middleware
// hashing password
UserSchema.pre("save", function (next){
  const user = this;

  // make sure don't hash password more than once
  if (user.isModified("password")){
    // generate salt and hash password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  } else{
    next();
  }
})

// static method to match document by username
UserSchema.statics.findByUsernamePassword = function (username, password){
  const User = this;

  // find user by username
  // todo: change this if login with email instead
  return User.findOne({userName: username}).then((user) => {
    if (!user){
      return Promise.reject();
    }

    // if user exist, check if password matches
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result){
          resolve(user);
        } else{
          reject();
        }
      })
    })
  })
}


const User = mongoose.model("User", UserSchema);

module.exports = { User }