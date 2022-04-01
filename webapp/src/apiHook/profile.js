import {addImage} from './image.js'
import {login, getlogin} from './loginSignUp'
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

async function postUser(data) {
    const id = data._id;
    delete data._id;
    delete data.__v;
    delete data.password;
    const favoriteStyles = [];

    console.log(data.profilePic)
    if(data.profilePic != undefined){
        await addImage(data.profilePic).then(json => data.profilePic = json["img"]);
    }
    console.log(data.profilePic)

    for(const idx in data.favoriteStyles){
        favoriteStyles.push(data.favoriteStyles[idx]);
    }
    delete data.favoriteStyles;
    data.favoriteStyles = favoriteStyles;

    const url = hostURL + '/api/users/' + id;
    console.log("------------------");
    console.log(JSON.stringify(data));

    const request = new Request(url, {
        method: 'put', 
        body: JSON.stringify(data), 
        headers: {
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Content-type': 'application/json'
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

async function getStyleById(id) {
    const url = hostURL + '/api/styles/' + id;

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




export {getStyleById, getUser, getStyles, postUser}