/* Artist mongoose model extends User*/
const mongoose = require('mongoose')

const Artist = mongoose.model('Artist', {
	userID: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
        ref: "User"
	},
	imageIDs: {
		type: [mongoose.SchemaTypes.ObjectId],
		required: false,
        ref: "Image"
	},
    homeLocation: {
        type: mongoose.SchemaTypes.ObjectId,
		required: true,
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
    license: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = { Artist }