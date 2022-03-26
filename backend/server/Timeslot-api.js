const log = console.log;
const { ObjectID } = require('mongodb')
const { mongoose } = require('../db/mongoose');
const { Timeslot } = require('../models/Timeslot')

module.exports = function(app) {
    function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
        return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
    }

    // create a new timeslot
    app.post('/api/timeslots', async (req, res) => {
        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        }  
    
        try {
            const timeslot = new Timeslot({
                artistID: req.body.artistID,
                locationID: req.body.locationID,
                startTime: req.body.startTime,
            })
            
            const result = await timeslot.save()	
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

    app.get('/api/timeslots', async (req, res) => {
        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        } 
    
        try {
            if(req.body.artistID){
                if(req.body.isBooked != undefined){
                    const isBookedTimeslot = await Timeslot.find({artistID:req.body.artistID, isBooked:req.body.isBooked})
                    res.send({ isBookedTimeslot })
                }else{
                    const artistTimeslot = await Timeslot.find({artistID:req.body.artistID})
                    res.send({ artistTimeslot })
                }
            }
            else if(req.body.locationID){
                const locationTimeslot = await Timeslot.find({locationID:req.body.locationID})
                res.send({ locationTimeslot })
            }
            else{
                const timeslot = await Timeslot.find()
                res.send({ timeslot })
            }
        } catch(error) {
            log(error)
            res.status(500).send("Internal Server Error")
        }
    })


    app.patch('/api/timeslots/:id', async (req, res) => {
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
            const timeslot = await Timeslot.findOneAndUpdate({_id: id}, {$set: req.body}, {new: true, useFindAndModify: false})
            if (!timeslot) {
                res.status(404).send('Resource not found')
            } else {   
                res.send(timeslot)
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

    // delete Timeslot by ID
    app.delete('/api/timeslots/:id', async (req, res) => {
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
            const timeslot = await Timeslot.findByIdAndRemove(id, {new: true, useFindAndModify: false})
            if (!timeslot) {
                res.status(404).send()
            } else {   
                res.send({timeslot})
            }
        } catch(error) {
            log(error)
            res.status(500).send() 
        }
    })    

}