/* Location mongoose model */
const mongoose = require('mongoose')

const Location = mongoose.model('Location', {
	country: {
		type: String,
		required: true
	},
    region: {
        type: String,
		required: true
    }
})

module.exports = { Location }