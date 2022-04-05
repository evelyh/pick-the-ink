const log = console.log;
const { ObjectID } = require('mongodb')
const { mongoose } = require('../db/mongoose');
const { Booking } = require('../models/Booking')
const { authenticateUser } = require('./authentication-helpers')
const { User } = require("../models/User");
const nodemailer = require("nodemailer");
const host = "http://localhost:5000/managebooking";
const sendingEmail = 'laapsaap.dev@gmail.com';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'pickink.mailing@gmail.com',
        accessToken: 'ya29.A0ARrdaM8fqyVematSMH9w4Xe8v101qmdBA6FtGrcGfepouWBWoXvN5rWk9ewdzryRKts2R0hB8u0pl35_gnseShxfKx66IAyhGJ1r3wL2euSiClXyLbce9TUm8OjwOduye1hJPHwwRH9ySnxHD6xTDSX5ple3'
    }
});

async function sendEmailConfirmation(requestBody, bookingId){
    // get booking
    const booking = await Booking.findById(bookingId).then(res => res);
    const artist = await User.findById(booking.artistID).then(res => res);
    const client = await User.findById(booking.customerID).then(res => res);

    // duration updated
    if (requestBody.duration){
        // send email to client
        const mailBodyToCustomer = {
            from: sendingEmail,
            to: client.email,
            subject: "Your PickINK booking has been updated",
            html: `<h3>Your selected artist ${artist.firstName} ${artist.lastName} has sent you an estimated duration of the session.</h3><p>The needed duration is: ${booking.duration}. <br/> Please visit <a href=${host}>Manage Booking</a> to see more details </p>`,
        };
        transporter.sendMail(mailBodyToCustomer, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    // booking confirmed
    if ((requestBody.isConfirmed && requestBody.timeslots) || requestBody.timeslots){
        // send email to artist
        const mailBodyToArtist = {
            from: sendingEmail,
            to: artist.email,
            subject: "PickINK Client booking has been confirmed",
            html: `<h3>Your booking with client ${client.firstName} ${client.lastName} is confirmed.</h3><p>There was a time change with the booking, please visit <a href=${host}>Manage Booking</a> to see details </p>`,
        };
        transporter.sendMail(mailBodyToArtist, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        // send email to customer
        const mailBodyToCustomer = {
            from: sendingEmail,
            to: client.email,
            subject: "Your PickINK booking has been confirmed",
            html: `<h3>Your booking with artist ${artist.firstName} ${artist.lastName} is confirmed.</h3><p>There was a time change with the booking, please visit <a href=${host}>Manage Booking</a> to see details </p>`,
        };
        transporter.sendMail(mailBodyToCustomer, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

async function sendEmailCancellation(artistId, clientId){
    const artist = await User.findById(artistId).then(res => res);
    const client = await User.findById(clientId).then(res => res);

    // send email to artist
    const mailBodyToArtist = {
        from: sendingEmail,
        to: artist.email,
        subject: "PickINK client booking has been cancelled",
        html: `<h3>Your booking with client ${client.firstName} ${client.lastName} is cancelled.</h3><p>If you did not initiate this, please contact your client before customer support if you have bookings set to cancellable.</p>`,
    };
    transporter.sendMail(mailBodyToArtist, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    // send email to customer
    const mailBodyToCustomer = {
        from: sendingEmail,
        to: client.email,
        subject: "Your PickINK booking has been cancelled",
        html: `<h3>Your booking with artist ${artist.firstName} ${artist.lastName} is cancelled.</h3><p>If you did not initiate this, please contact your artist.</p>`,
    };
    transporter.sendMail(mailBodyToCustomer, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = function(app) {
    function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
        return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
    }

    // add a booking
    app.post('/api/bookings', async (req, res) => {
        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        }  
    
        try {
            const booking = new Booking({
                artistID: req.body.artistID,
                customerID: req.body.customerID,
                isCancellable: req.body.isCancellable,
                isModifiable: req.body.isModifiable,
                choice: req.body.choice,
                flashLink: req.body.flashLink,
                customIdea: req.body.customIdea,
                size: req.body.size,
                placement: req.body.placement,
                otherLink: req.body.otherLink,
                concerns: req.body.concerns
            })
            
            const result = await booking.save()	
            res.send({result})
        } catch(error) {
            log(error) 
            if (isMongoError(error)) 
            {
                res.status(500).send('Internal server error')
            } else {
                res.status(400).send('Bad Request')
            }
        }
    })

    app.post('/api/bookings/:id', async (req, res) => {
        // Add code here
        const id = req.params.id
    
        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        } 
    
        try {
            const booking = await Booking.findById(id)
            if (!booking) {
                res.status(404).send('Resource not found')
            } else { 
                const timeslot = req.body.timeslot
                booking.timeslots.push(timeslot)
                const newBooking = await booking.save()	
                res.send({"timeslot":timeslot,"booking":newBooking})
            }
        }  catch(error) {
            log(error) 
            if (isMongoError(error)) 
            {
                res.status(500).send('Internal server error')
            } else {
                res.status(400).send('Bad Request')
            }
        }
    })

    // THIS IS A GET, BUT EASIER TO MAKE IT TO WORK BY CHANGING TO POST THAN REWRITING AS QUERY
    // get all / get by artistID / get by customerID / get by isConfirmed
    // if do not have req.body, get all
    // req.body.artistID, get all bookings of that artist
    // req.body.customerID, get all bookings of that customer
    // req.body.artistID AND req.body.isConfirmed, get all bookings for confirmed/ (not confirmed) artist's bookings
    // req.body.customerID AND req.body.isConfirmed, get all bookings for confirmed/ (not confirmed) customer's bookings
    app.post('/api/get-bookings', async (req, res) => {
        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        } 
    
        try {
            if(req.body.artistID){
                if(req.body.isConfirmed != undefined){
                    const isConfirmedBooking = await Booking.find({artistID:req.body.artistID, isConfirmed:req.body.isConfirmed})
                    res.send({ isConfirmedBooking })
                }else{
                    const artistBooking = await Booking.find({artistID:req.body.artistID})
                    res.send({ artistBooking })
                }
            }
            else if(req.body.customerID){
                if(req.body.isConfirmed != undefined){
                    const isConfirmedBooking = await Booking.find({customerID:req.body.customerID, isConfirmed:req.body.isConfirmed})
                    res.send({ isConfirmedBooking })
                }else{
                    const customerBooking = await Booking.find({customerID:req.body.customerID})
                    res.send({ customerBooking })
                }
            }
            else{
                const booking = await Booking.find()
                res.send({ booking })
            }
        } catch(error) {
            log(error)
            res.status(500).send("Internal Server Error")
        }
    })

    // get particular booking id
    app.get('/api/bookings/:id',authenticateUser, async (req, res) => {
        // Add code here
            
        const id = req.params.id
        
        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        }
        
        try {
            const result = await Booking.findById(id)
            if (!result) {
                res.status(404).send('Resource not found')
            } else { 
                res.send({result})
            }
        } catch(error) {
            log(error)
            res.status(500).send('Internal Server Error')
        }
    })

    // update SOME fields in booking by ID
    app.patch('/api/bookings/:id', async (req, res) => {
        const id = req.params.id
    
        if (!ObjectID.isValid(id)) {
            res.status(404).send()
            return;  // so that we don't run the rest of the handler.
        }
    
        // check mongoose connection established.
        if (mongoose.connection.readyState != 1) {
            log('Issue with mongoose connection')
            res.status(500).send('Internal server error')
            return;
        }
    
        try {
            const booking = await Booking.findOneAndUpdate({_id: id}, {$set: req.body}, {new: true, useFindAndModify: false})
            if (!booking) {
                res.status(404).send('Resource not found')
            } else {
                await sendEmailConfirmation(req.body, id);
                res.send(booking)
            }
        } catch (error) {
            log(error)
            if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
                res.status(500).send('Internal server error')
            } else {
                res.status(400).send('Bad Request') // bad request for changing the student.
            }
        }
    })

    // delete booking by ID
    app.delete('/api/bookings/:id', async (req, res) => {
        const id = req.params.id
    
        // Validate id
        if (!ObjectID.isValid(id)) {
            res.status(404).send('Resource not found')
            return;
        }
    
        // check mongoose connection established.
        if (mongoose.connection.readyState != 1) {
            log('Issue with mongoose connection')
            res.status(500).send('Internal server error')
            return;
        } 
    
        try {
            const beforeRemoveBooking = await Booking.findById(id).then(res => res);
            const booking = await Booking.findByIdAndRemove(id, {new: true, useFindAndModify: false})
            if (!booking) {
                res.status(404).send()
            } else {
                await sendEmailCancellation(beforeRemoveBooking.artistID, beforeRemoveBooking.customerID);
                res.send({booking})
            }
        } catch(error) {
            log(error)
            res.status(500).send() 
        }
    })    


}