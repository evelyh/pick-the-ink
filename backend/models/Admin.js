/* Admin mongoose model */
const mongoose = require('mongoose')

const Admin = mongoose.model('Admin', {
	userID: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
	},
	userName: {
		type: String,
		required: true,   
        minlegth: 1
	},
    password: {
        type: String,
        required: true,
        minlegth: 1
    }
})

module.exports = { Admin }