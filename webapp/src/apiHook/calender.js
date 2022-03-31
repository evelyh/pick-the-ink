const { getBookings } = require("./booking");

const log = console.log
log('Loaded front-end javascript.')

const hostURL = "http://localhost:5000";

// get timeslot by timeslot ID
async function getTimeslotsById(id) {
    // the URL for the request
    const url = hostURL + "/api/timeslots/" + id;

    log(typeof(id))
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

// get all timeslots of user including booked and non-booked timeslots
async function getTimeslotsByUser(data) {
    // the URL for the request
    let url = hostURL + "/api/timeslots?";
    if (data["artistID"] != undefined){
        url = url + "artistID=" + data["artistID"] + "&"
    }
    if (data["customerID"] != undefined){
        url = url + "customerID=" + data["customerID"] + "&"
    }
    if (data["isBooked"] != undefined){
        url = url + "isBooked=" + data["isBooked"] + "&"
    }
    if (data["locationID"] != undefined){
        url = url + "locationID=" + data["locationID"] + "&"
    }
    log(url)
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


export {getTimeslotsByUser, getTimeslotsById, getBookings}