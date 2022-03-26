const { User } = require('../models/User')

module.exports = function(app) {
    app.post('/users', async (req, res) => {
        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        }  
    
        const user = new User({
            userName: req.body.name
        })
    
        // save restaurant to database
        try {
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

}