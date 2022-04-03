const log = console.log
log('Loaded front-end javascript.')
const host = "http://localhost:5000";

async function getAllImage() 
{
    const url = host + "/api/images/";

    const request = new Request(url, {
        method: "GET",
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

async function updateImageById(imageID, data)
{   
    console.log(JSON.stringify(data))
    const url = host + "/api/images/" + imageID;

    const request = new Request(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        } 
    });

    return await fetch(request).then(res => {
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

async function deleteImageById(imageID) 
{
    const url = host + "/api/images/" + imageID;
    const request = new Request(url, {
        method: "DELETE",
    });

    return await fetch(request).then(res => {
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

async function addImageUserProfile(img) {
    // the URL for the request
    const url = host + '/api/images';
    // The data we are going to send in our request

    let formData = new FormData()
    formData.append('img', img)

    return await fetch(url,
    {
        body: formData,
        method: "post"
    }).then(function(res) {
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                console.log('Successfully added image') 
                return res.json();
            } else {
                // If server couldn't add the student, tell the user.
                console.log('[Unsuccessful] add image')
            }
        }).catch((error) => {
            log(error)
        })
}

async function addImage(data) {

    console.log(data);

    const url = host + "/api/images";
    const imageData = new FormData();
    if (data.title !== undefined)
    {
        imageData.append('title', data.title)
    }
    
    if (data.desc !== undefined)
    {
        imageData.append('desc', data.desc)
    }
    imageData.append('img', data.img)
    const request = new Request(url, {
        method: "post",
        body: imageData,
    });

    // Send the request with fetch()
    return await fetch(request).then(res =>{
        if (res.status === 200){
            log("success")
            return res.json()
        }
        else
        {
            log("failed")
        }
    })
    .catch(error => {
            console.log(error);
        });
};

async function updateArtistsGallery(data)
{
    const url = host + '/api/users/' + data._id;

    const request = new Request(url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    return await fetch(request).then(res => {
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
            console.log("Successfully updated gallery")
            return res.json();
        } else {
            console.log("Failed to update gallery")
            alert("Failed to update gallery");
        }
    }).catch(error => {
        console.log(error);
    });
}

export {getAllImage, getImageById, updateImageById, deleteImageById, addImage, updateArtistsGallery, addImageUserProfile}