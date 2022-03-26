const log = console.log;
const { ObjectID } = require('mongodb')
const { mongoose } = require('../db/mongoose');
const { Booking } = require('../models/Booking')

module.exports = function(app) {
    app.post('/bookings', async (req, res) => {
        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        }  
    
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
    
        try {
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

    app.get('/bookings', async (req, res) => {
        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        } 
    
        // Get the restaurants
        try {
            const booking = await Booking.find()
            res.send({ booking })
        } catch(error) {
            log(error)
            res.status(500).send("Internal Server Error")
        }
    })



}