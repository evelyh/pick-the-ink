
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
        console.log(error)
    })
}


async function getStyles(data){
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
        console.log(error)
    })
}


async function getTimeslots(data){
    const url = hostURL + '/api/timeslots/' + '?start=' + data.start + '&end=' + data.end
    console.log(url)
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
        console.log(error)
    })
}


async function getArtists(data){
    var url = hostURL + '/api/findArtists/?';
    if(data.styleIDs){
        url += 'style=['
        const len = data.styleIDs.length;
        for(let i = 0; i < len; i++){
            url += `"${data.styleIDs[i]}"`
            if(i != len-1){
                url += ","
            }
        }
        url += ']'
    }
    if(data.locationID){
        if(data.styleIDs){
            url += '&'
        }
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
        console.log(error)
    })
}

export {getLocation, getStyles, getTimeslots, getArtists}