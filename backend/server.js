'use strict';


const log = console.log;

// Express
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false);

require('./server/Admin-api')(app)
// require('./server/Artist-api')(app)
require('./server/Booking-api')(app)
require('./server/Image-api')(app)
require('./server/Location-api')(app)
require('./server/Style-api')(app)
require('./server/Timeslot-api')(app)
require('./server/User-api')(app)

const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});