const log = console.log;
const { ObjectID } = require('mongodb')
const { mongoose } = require('../db/mongoose');
const {Image} = require('../models/Image')

const multer = require("multer");
const req = require('express/lib/request');

const fs = require("fs")

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './images/')
    },
    filename: function(req, file, callback) {
        log(req)
        callback(null, file.originalname + '.png')
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === "image/png" || file.mimetype === 'image/jpeg')
    {
        callback(null, true)
    }
    else
    {
        callback("Please upload a .jpg, .png, or .jpeg file. ", false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

module.exports = function (app){

    function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
        return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
    }

    //Upload a new file
    app.post("/api/images", upload.single('img'), async(req, res) => {
        log(req.file)

        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        }

        try {
            const image = new Image({
                desc: req.body.desc,
                img: req.file.path,
                path: req.file.path
            })
            
            const result = await image.save()	
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

    // Get image by ID
    app.get('/api/images/:id', async (req, res) => {
        // Add code here
        const id = req.params.id
        
        if (mongoose.connection.readyState != 1) {
            log('There is issue to mongoose connection')
            res.status(500).send('Internal server error')
            return;
        }
        
        try {
            const result = await Image.findById(id)
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

    // delete image by id
    app.delete('/api/images/:id', async (req, res) => {
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

        var img = await Image.findById(id)
        log(img)
        const path = "./images/"
        
        try {
            log(id)
            const image = await Image.findByIdAndRemove(id, {new: true, useFindAndModify: false},
                function(err, img) {
                    if(err) 
                    {
                        log(error)
                        res.status(500).send() 
                    } 
                    else 
                    {
                        fs.unlink(img.path, (err) => {
                            if (err) {
                                console.log("failed to delete local image:"+err);
                                res.status(500).send() 
                            } 
                            else 
                            {
                                console.log('successfully deleted local image');                             
                            }
                        })
                    }
                  })          
            if (!image) {
                res.status(404).send()
            } else {   
                res.send({image})
            }
        } catch(error) {
            log(error)
            res.status(500).send() 
        }
    })
  }