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
            console.log('Could not get timeslots')
       }                
    }).catch((error) => {
        log(error)
    })
}

async function postTimeslot(artistID,locationID, date, start, end) {
    // the URL for the request
    const url = hostURL + "/api/timeslots";

     console.log(date, start, end)
     if(start>end){
         return "start time must before end time";
     }
     for(let i = start; i<=end; i++){
         console.log(date+" " + i)
        const str = date+" 0" + i + ":00:00";
        const newDate = new Date(str);
        console.log(newDate, artistID, locationID);
        const request = new Request(url, {
            method: 'post',
            body: JSON.stringify({"startTime":newDate, artistID:artistID, "locationID":locationID}),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
        await fetch(request)
        .then((res) => { 
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                console.log('timeslot succesfully added')
           } else {
                console.log('Could not post timeslot')
           }                
        }).catch((error) => {
            log(error)
        })
     }
    
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
            console.log('Could not get timeslots')
       }                
    }).catch((error) => {
        log(error)
    })
}


export {getTimeslotsByUser, getTimeslotsById, getBookings, postTimeslot}