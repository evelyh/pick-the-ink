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
	title: {
		type: String,
		required: false
	},
    desc: {
        type: String,
        required: false
    },
	// path: {
	// 	type: String,
	// 	required: false
	// },
	created_at: String,

})

module.exports = { Image }