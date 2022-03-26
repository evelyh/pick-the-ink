const log = console.log;
const { ObjectID } = require('mongodb')
const { mongoose } = require('../db/mongoose')
const { User } = require('../models/User')

module.exports = function(app) {
    function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
        return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
    }

    app.post('/users', async (req, res) => {
        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        }   
    
        // save restaurant to database
        try {
            const user = new User({
                userName: req.body.userName,
                password: req.body.password,
                email:req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate
            })
            
            const result = await user.save()	
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

    app.get('/users', async (req, res) => {
        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        } 
    
        try {
            const user = await User.find()
            res.send({ user })
        } catch(error) {
            log(error)
            res.status(500).send("Internal Server Error")
        }
    })

}