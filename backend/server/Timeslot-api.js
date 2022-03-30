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

    //get timeslot by ??
    app.get('/api/timeslots', async (req, res) => {
        
        var artistID = req.param("artistID");
        var isBooked = req.param("isBooked");
        var locationID = req.param("locationID")
        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        } 
        
        data ={}

        if(artistID != undefined){
            data["artistID"] = artistID
        }
        if(isBooked != undefined){
            data["isBooked"] = isBooked
        }
        if(locationID != undefined){
            data["locationID"] = locationID
        }
        log(data)
    
        try {
            const result = await Timeslot.find(data);
            if (!result) {
                res.status(404).send('Resource not found')
            } else { 
                res.send({result})
            }   
        } catch(error) {
            log(error)
            res.status(500).send("Internal Server Error")
        }
    })

    //get timeslots by start and end time
    app.get('/api/timeslots', async(req, res) => {
        let start = req.query.start
        let end = req.query.end

        try{
            const result = await Timeslot.find({startTime: {$gte: start, $lte: end}, isBooked: false})
            res.send(result)
        } catch(error) {
            log(error)
            res.status(500).send("Internal Server Error")
        }
    })

    app.get('/api/timeslots/:id', async (req, res) => {
        // Add code here
            
        const id = req.params.id
        
        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        }
        
        try {
            const result = await Timeslot.findById(id)
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