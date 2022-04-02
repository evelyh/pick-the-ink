const mongoose = require('mongoose')

//const mongoURI = "mongodb+srv://admin:admin@cluster0.zdttv.mongodb.net/PickInkAPI?retryWrites=true&w=majority"

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/PickInkAPI'

mongoose.connect(mongoURI, 
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
	.then(() => {
		console.log("connected to db")
	})
	.catch((error) => { 
		console.log('Error connecting to mongodb. Timeout reached.') 
	})
;

module.exports = { mongoose }  