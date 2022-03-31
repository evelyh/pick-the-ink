/* User mongoose model */
const mongoose = require('mongoose')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const ArtistSchema = new mongoose.Schema({
	artworks: {
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
        required: false,
        ref: "Image"
    },
    license: {
        type: mongoose.SchemaTypes.ObjectId,
        required: false,
        ref: "Image"
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    }
});

const User = mongoose.model('User', {
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

module.exports = { User }