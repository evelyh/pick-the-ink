
const hostURL = "http://localhost:5000";

async function getLocation(data){
    const url = hostURL + '/api/locations/' + '?country=' + data.country +'&region='+ data.region
    const request = new Request(url, {
        method: 'get', 
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    return await fetch(request).then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
            return res.json() 
        }else{
            alert('Could not get Bookings')
        }                
    }).catch((error) => {
        log(error)
    })
}


async function getStyle(data){
    const url = hostURL + '/api/styles/' + '?name=' + data.style
    const request = new Request(url, {
        method: 'get', 
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    return await fetch(request).then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
            return res.json() 
        }else{
            alert('Could not get Bookings')
        }                
    }).catch((error) => {
        log(error)
    })
}


async function getTimeslot(data){
    const url = hostURL + '/api/timeslots/' + '?start=' + data.start + '&end=' + data.end
    const request = new Request(url, {
        method: 'get', 
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    return await fetch(request).then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
            return res.json() 
        }else{
            alert('Could not get Bookings')
        }                
    }).catch((error) => {
        log(error)
    })
}


async function getArtists(data){
    const url = hostURL + '/api/findArtists/?';
    if(data.styleIDs){
        const len = styleIDs.length;
        for(let i = 0; i < len; i++){
            url += `style=${data.styleIDs[i]}&`
        }
    }
    if(data.locationID){
        url += `location=${data.locationID}`
    }
    const request = new Request(url, {
        method: 'get', 
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    return await fetch(request).then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
            return res.json() 
        }else{
            alert('Could not get Bookings')
        }                
    }).catch((error) => {
        log(error)
    })
}