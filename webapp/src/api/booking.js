const log = console.log

log('Loaded front-end javascript.')

const backWeb = "http://localhost:5000";

// GET bookings request to the web server,
function getBookings(data) {
    // the URL for the request
    const url = backWeb + '/api/bookings';

    const request = new Request(url, {
        method: 'get', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
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
function getBookingsByID(id) {
    // the URL for the request
    const url = backWeb + '/api/bookings/' + {id};

    const request = new Request(url, {
        method: 'get',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
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

function addBooking(data) {
    // the URL for the request
    const url = backWeb + '/api/bookings';

    // The data we are going to send in our request
    // let data = {
    //     name: document.querySelector('#name').value,
    //     year: document.querySelector('#year').value
    // }
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {

        if (res.status === 200) {
            // If student was added successfully, tell the user.
            console.log('Successfully added booking')
        } else {
            // If server couldn't add the student, tell the user.
            console.log('[Unsuccessful] add booking')
     
        }
        log(res)  // log the result in the console for development purposes
    }).catch((error) => {
        log(error)
    })
}

