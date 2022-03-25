/* Image mongoose model */
const mongoose = require('mongoose')

const Image = mongoose.model('Image', {
	imageID: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
	},
	link: {
		type: String,
		required: true,
	},
    Text: {
        type: String,
        required: false
    }
})

module.exports = { Image }