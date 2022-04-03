const log = console.log;
const { ObjectID } = require('mongodb')
const { mongoose } = require('../db/mongoose');
const { Booking } = require('../models/Booking')
const { authenticateUser } = require('./authentication-helpers')

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
            const booking = await Booking.findByIdAndRemove(id, {new: true, useFindAndModify: false})
            if (!booking) {
                res.status(404).send()
            } else {   
                res.send({booking})
            }
        } catch(error) {
            log(error)
            res.status(500).send() 
        }
    })    


}