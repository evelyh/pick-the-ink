/* Image mongoose model */
const mongoose = require('mongoose')

const Image = mongoose.model('Image', {
	imageID: {
		type: mongoose.SchemaTypes.ObjectId,
	},
	img: { 
		type: String, 
		required: true
	},
    desc: {
        type: String,
        required: false
    },
	path: {
		type: String
	}
})

module.exports = { Image }