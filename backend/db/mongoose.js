const mongoose = require('mongoose')

// get the URL of local database
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/PickInkAPI'

mongoose.connect(mongoURI, 
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
	.catch((error) => { 
		console.log('Error connecting to mongodb. Timeout reached.') 
	})
;

module.exports = { mongoose }  