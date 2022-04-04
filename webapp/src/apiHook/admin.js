import { getUser } from "./profile";

const hostURL = "http://localhost:5000";

async function getAllUsers() {
    const url = hostURL + '/api/users';
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
        console.log(error)
    })
}

async function loginAdmin(credentials) {
    const url = hostURL + '/admin/login'
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

async function getUserLicense(id) {
    const user = await getUser(id)
    console.log(user)
    return user.artistSub.license
}

async function getUserPhyID(id) {
    const user = await getUser(id)
    return user.artistSub.physicalID
}

async function verifyArtist(data) {
    console.log(data)
    const url = `${hostURL}/api/users/${data.userID}`
    console.log(url)
    const request = new Request(url, {
        method: 'PUT',
        body: JSON.stringify({"artistSub.approved": data.verify}),
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
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
        console.log(error)
    })
}

async function checkUser(data) {
    const url = `${hostURL}/api/users/${data.userID}`;
    const request = new Request(url, {
        method: 'put',
        body: {"status": data.status},
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
        console.log(error)
    })
}



export {loginAdmin, getAllUsers, getUserLicense, getUserPhyID, verifyArtist, checkUser}