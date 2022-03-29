const log = console.log;
const { ObjectID } = require('mongodb')
const { mongoose } = require('../db/mongoose')
const { User } = require('../models/User')

module.exports = function(app) {
    function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
        return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
    }

    //create user
    app.post('/api/users', async (req, res) => {
        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        }   
    
        try {
            const user = new User({
                userName: req.body.userName,
                password: req.body.password,
                email:req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                isArtist: req.body.isArtist
            })
            if(user.isArtist){
                user.artistSub = {
                    homeLocation: req.body.homeLocation,
                    license: req.body.artistSub.license,
                    physicalID: req.body.artistSub.physicalID
                }
                user.artistSub.artStyles.concat(req.body.artStyles)
            }else{
                user.artistSub = null;
            }

            console.log(user);
            
            const result = await user.save()	
            res.send(result)
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

    //get all users
    app.get('/api/users', async (req, res) => {
        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        } 
    
        try {
            const user = await User.find()
            res.send(user)
        } catch(error) {
            log(error)
            res.status(500).send("Internal Server Error")
        }
    })


    //get user by id
    app.get("/api/users/:id", async(req, res) => {
        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        } 
        
        const id = req.params.id;

        try{
            const result = await User.findById(id);
            if (!result) {
                res.status(404).send('Resource not found')
            } else { 
                res.send({result})
            }
        }catch(error) {
            log(error)
            res.status(500).send('Internal Server Error')
        }
    })


    //search artists by conditions
    app.get("/api/findArtists", async(req, res) => {
        const {query} = req.query;
        try{
            const result = await User.find(
                {artistSub: {$and: [{homeLocation: query.locationID}, 
                                    {artStyles: {$in: query.styleIDs}}]
                                }, isArtist: true});
            if (!result) {
                res.status(404).send('Resource not found')
            } else { 
                res.send({result})
            }   
        }catch(error) {
            log(error)
            res.status(500).send('Internal Server Error')
        }
    })

    //modify user info by id
    app.patch("/api/users/:id", async(req, res) => {
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
            const user = await User.findOneAndUpdate({_id: id}, {$set: req.body}, {new: true, useFindAndModify: false})
            if (!user) {
                res.status(404).send('Resource not found')
            } else {   
                res.send(user)
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

    //delete user by id
    app.delete("/api/users/:id", async(req, res) => {
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
            const user = await User.findByIdAndRemove(id, {new: true, useFindAndModify: false})
            if (!user) {
                res.status(404).send()
            } else {   
                res.send({user})
            }
        } catch(error) {
            log(error)
            res.status(500).send() 
        }
    })

}