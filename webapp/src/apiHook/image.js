const log = console.log
log('Loaded front-end javascript.')

const host = "http://localhost:5000";

function getAllImage() 
{
    const url = host + "/api/images/";

    const request = new Request(url, {
        method: "GET",
    });

    fetch(request).then(res => {
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
            console.log("Successfully get image")
            return res.json();
        } else {
            console.log("Failed to get image")
            alert("Failed to get image");
        }
    }).catch(error => {
        console.log(error);
    });
}

async function getImageById(imageID) 
{
    const url = host + "/api/images/" + imageID;

    const request = new Request(url, {
        method: "GET",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    return await fetch(request).then(res => {
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
            console.log("Successfully get image")
            return res.json();
        } else {
            console.log("Failed to get image")
            alert("Failed to get image");
        }
    }).catch(error => {
        console.log(error);
    });
}

function updateImageById(imageID, decs, title)
{
    const url = host + "/api/images/" + imageID;

    const request = new Request(url, {
        method: "UPDATE",
        body: {
            decs: decs,
            title:title
        },
        headers: {
            "Content-Type": "application/json",
        }
    });

    fetch(request).then(res => {
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
            console.log("Successfully updated image")
            return res.json();
        } else {
            console.log("Failed to update image")
            alert("Failed to update image");
        }
    }).catch(error => {
        console.log(error);
    });
}

function deleteImageById(imageID) 
{
    const url = host + "/api/images/" + imageID;
    const request = new Request(url, {
        method: "DELETE",
    });

    fetch(request).then(res => {
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
            console.log("Successfully delete image")
            return res.json();
        } else {
            console.log("Failed to delete image")
            alert("Failed to delete image");
        }
    }).catch(error => {
        console.log(error);
    });
}

async function addImage(img) {
    // the URL for the request
    const url = host + '/api/images';
    // The data we are going to send in our request

    let formData = new FormData()
    formData.append('file', img)
    log(formData)

    const request = new Request(url, {
        method: 'post', 
        body: formData,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json, multipart/form-data',
            "Access-Control-Allow-Origin": "*"
        },
    });
    log(request)

    // Send the request with fetch()
    return await fetch(request).then(function(res) {
        if (res.status === 200) {
            // If student was added successfully, tell the user.
            console.log('Successfully added image') 
            log(res.json())
            return res.json();
        } else {
            // If server couldn't add the student, tell the user.
            console.log('[Unsuccessful] add image')
        }
        // log(res)  // log the result in the console for development purposes
    }).catch((error) => {
        log(error)
    })
}

export {getAllImage, getImageById, updateImageById, deleteImageById, addImage}