/* Location mongoose model */
const mongoose = require('mongoose')

const Location = mongoose.model('Location', {
	locationID: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
	},
	cityName: {
		type: String,
		required: true
	},
    provName: {
        type: String,
		required: true
    }
})

module.exports = { Location }