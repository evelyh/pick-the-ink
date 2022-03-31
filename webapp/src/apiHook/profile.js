const log = console.log
log('Loaded front-end javascript.')

const hostURL = "http://localhost:5000";

async function getUser(id) {
    const url = hostURL + '/api/users/' + id;

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
            alert('Could not get current logged in User')
       }                
    }).catch((error) => {
        log(error)
    })
}

async function postUser(form) {

    const id = form._id;
    const data = form;
    delete data._id;
    delete data.__v;
    const url = hostURL + '/api/users/' + id;
    console.log(JSON.parse(JSON.stringify(data)), 1);
    const request = new Request(url, {
        method: 'patch', 
        body: JSON.parse(JSON.stringify(data)),
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
            console.log('Successfully update user') 
            return res.json()
        } else {
            // If server couldn't add the student, tell the user.
            console.log('[Unsuccessful] update user')
            return res.status
        }
    }).
    catch((error) => {
        log(error)
    })
}


async function getStyles() {
    const url = hostURL + '/api/styles';

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
            alert('Could not get current logged in User')
       }                
    }).catch((error) => {
        log(error)
    })
}

export {getUser, getStyles, postUser}