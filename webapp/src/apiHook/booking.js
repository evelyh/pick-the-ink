import {addImage} from './image.js'
const log = console.log
log('Loaded front-end javascript.')

const hostURL = "http://localhost:5000";

// GET bookings request to the web server,
async function getBookings(data) {
    // the URL for the request
    const url = hostURL + '/api/bookings';

    const request = new Request(url, {
        method: 'get', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    return await fetch(request)
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json() 
       } else {
            alert('Could not get Bookings')
       }                
    }).catch((error) => {
        log(error)
    })
}

// GET bookings by id request to the web server,
async function getBookingsByID(id) {
    // the URL for the request
    const url = hostURL + '/api/bookings/' + {id};

    const request = new Request(url, {
        method: 'get',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    return await fetch(request)
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json() 
       } else {
            alert('Could not get Bookings by ID')
       }                
    }).catch((error) => {
        log(error)
    })
}

// await addBooking() when call. Need to call this function in an async function. Return status code. 
// 200 on success, 400 on unsuccess
async function addBooking(form) {
    // the URL for the request
    const url = hostURL + '/api/bookings';
    // The data we are going to send in our request

    // need to call addImage and get back the id of the image added
    // if(form.flashLink != undefined){
    //     addImage(form.flashLink)
    // }
    // if(form.otherLink != undefined){
    //     addImage(form.otherLink)
    // }

    let data = {
        artistID: "623f4747554c0d0d6fe6c99f",
        customerID: "623f4747554c0d0d6fe6c99f",
        isCancellable: true,
        isModifiable: true,
        choice: form.choice,
        // flashLink: imageId,
        customIdea: form.customIdea,
        size: form.size,
        placement: form.placement,
        // otherLink: form.otherLink,
        concern: form.concern
    }
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
    });

    // Send the request with fetch()
    return await fetch(request).then(res => {
        if (res.status === 200) {
            // If student was added successfully, tell the user.
            console.log('Successfully added booking') 
            return res.status
        } else {
            // If server couldn't add the student, tell the user.
            console.log('[Unsuccessful] add booking')
            return res.status
        }
    }).
    catch((error) => {
        log(error)
    })
}

export {getBookings, addBooking, getBookingsByID}