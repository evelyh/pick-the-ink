import {addImageUserProfile} from './image.js'
import {login, getLoginStatus} from './loginSignUp'
const log = console.log
log('Loaded front-end javascript.')

const hostURL = "http://localhost:5000";

console.log(getLoginStatus().then(json=> console.log(json)), 5555);
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
           return false;
       }                
    }).catch((error) => {
        log(error)
    })
}

async function getUserFollowing(id) {

    const json = await getUser(id);
    const ids = json["followingIDs"];

    const arr = new Array();
    if(ids != undefined){
        for(const idx in ids){
            const followU = await getUser(ids[idx]);
            let uLink;
            if(followU["isArtist"] == true){
                uLink = "/artistprofile/" + followU["_id"];
            }else{
                uLink = "/userprofile/" + followU["_id"];
            }
            const uName = followU["userName"];
            const uPic = followU["profilePic"];

            arr.push({"uLink":uLink, "uName":uName, "uPic":uPic})
        }
    }
    
    return arr;
}

async function getUserFollower(id) {

    const json = await getUser(id);
    const ids = json["followerIDs"];

    const arr = new Array();
    if(ids != undefined){
        for(const idx in ids){
            const followU = await getUser(ids[idx]);
            let uLink;
            if(followU["isArtist"] == true){
                uLink = "/artistprofile/" + followU["_id"];
            }else{
                uLink = "/userprofile/" + followU["_id"];
            }
            const uName = followU["userName"];
            const uPic = followU["profilePic"];

            arr.push({"uLink":uLink, "uName":uName, "uPic":uPic})
        }
    }
    
    return arr;
}

async function getLocationById(id) 
{
    const url = hostURL+"/api/locations/"+id;

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
           return false;
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
    if(data.profilePic != undefined && typeof(data.profilePic) == 'object'){
        await addImageUserProfile(data.profilePic).then(json => 
            {
                console.log(json, 66666)
                data.profilePic = json["img"]}
            );
    }else{
        delete data.profilePic;
    }
    
    for(const idx in data.favoriteStyles){
        favoriteStyles.push(data.favoriteStyles[idx]);
    }
    delete data.favoriteStyles;
    data.favoriteStyles = favoriteStyles;

    const url = hostURL + '/api/users/' + id;
    console.log("------------------");
    console.log(data)
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

async function followUser(follow, follower) {
    
    const fUser = await getUser(follow);
    fUser.followerIDs.push(follower);
    console.log(fUser.followerIDs, "follow")
    const followurl = hostURL + '/api/users/' + follow;



    const ferUser = await getUser(follower);
    ferUser.followingIDs.push(follow);
    console.log(ferUser.followingIDs, "follow")
    const followerurl = hostURL + '/api/users/' + follower;

    const followRequest = new Request(followurl, {
        method: 'put', 
        body: JSON.stringify({followerIDs: fUser.followerIDs}), 
        headers: {
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Content-type': 'application/json'
        },
    });

    const followerRequest = new Request(followerurl, {
        method: 'put', 
        body: JSON.stringify({followingIDs: ferUser.followingIDs}), 
        headers: {
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Content-type': 'application/json'
        },
    });

    await fetch(followRequest).then(res => {
        if (res.status === 200) {
            // If student was added successfully, tell the user.
            console.log('Successfully follow user') 
            return res.json()
        } else {
            // If server couldn't add the student, tell the user.
            console.log('[Unsuccessful] follow user')
            return res.status
        }
    }).
    catch((error) => {
        log(error)
    })

    await fetch(followerRequest).then(res => {
        if (res.status === 200) {
            // If student was added successfully, tell the user.
            console.log('Successfully follower user') 
            return res.json()
        } else {
            // If server couldn't add the student, tell the user.
            console.log('[Unsuccessful] follower user')
            return res.status
        }
    }).
    catch((error) => {
        log(error)
    })

}

async function unfollowUser(follow, follower) {
    
    const fUser = await getUser(follow);
    console.log(fUser, "follow")
    console.log(fUser.followerIDs, "unfollowUser-before")
    fUser.followerIDs = fUser.followerIDs.filter(function(item) {
        return item !== follower
    })
    console.log(fUser.followerIDs, "unfollowUser-after")
    const followurl = hostURL + '/api/users/' + follow;


    const ferUser = await getUser(follower);
    console.log(ferUser, "follower")
    console.log(ferUser.followingIDs, "curr-before")
    ferUser.followingIDs = ferUser.followingIDs.filter(function(item) {
        return item !== follow
    })
    console.log(ferUser.followingIDs, "curr-after")
    console.log(ferUser.followingIDs)
    const followerurl = hostURL + '/api/users/' + follower;

    const followRequest = new Request(followurl, {
        method: 'put', 
        body: JSON.stringify({followerIDs: fUser.followerIDs}), 
        headers: {
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Content-type': 'application/json'
        },
    });

    const followerRequest = new Request(followerurl, {
        method: 'put', 
        body: JSON.stringify({followingIDs: ferUser.followingIDs}), 
        headers: {
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Content-type': 'application/json'
        },
    });

    await fetch(followRequest).then(res => {
        if (res.status === 200) {
            // If student was added successfully, tell the user.
            console.log('Successfully follow user') 
            return res.json()
        } else {
            // If server couldn't add the student, tell the user.
            console.log('[Unsuccessful] follow user')
            return res.status
        }
    }).
    catch((error) => {
        log(error)
    })

    await fetch(followerRequest).then(res => {
        if (res.status === 200) {
            // If student was added successfully, tell the user.
            console.log('Successfully follower user') 
            return res.json()
        } else {
            // If server couldn't add the student, tell the user.
            console.log('[Unsuccessful] follower user')
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




export {getStyleById, getUser, getStyles, postUser, getUserFollowing, getUserFollower, followUser, unfollowUser, getLocationById}