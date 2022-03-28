'use strict';


const log = console.log;

// Express
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

require('./server/Booking-api')(app)
require('./server/User-api')(app)
require('./server/Timeslot-api')(app)
require('./server/Image-api')(app)


const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});