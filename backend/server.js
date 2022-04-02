'use strict';

const log = console.log;

// Express
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors({
	origin: ["http://localhost:3000"], // todo: add hosts
	methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
	withCredentials: true,
}));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.static("build"));

// session handling
const session = require("express-session");
// middleware to create session on every request
app.use(session({
	secret: "some secret", // todo: change
	cookie: {
		expires: 360000, // expires in 1hr
		httpOnly: true,
	},
	saveUninitialized: false,
	resave: false,
}));

require('./server/Admin-api')(app)
// require('./server/Artist-api')(app)
require('./server/Booking-api')(app)
require('./server/Image-api')(app)
require('./server/Location-api')(app)
require('./server/Style-api')(app)
require('./server/Timeslot-api')(app)
require('./server/User-api')(app)

app.use("*", express.static("build"));

const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});