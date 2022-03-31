const log = console.log
log('Loaded front-end javascript.')

const hostURL = "http://localhost:5000";

async function addImage(img) {
    // the URL for the request
    const url = hostURL + '/api/images';
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

export {addImage}