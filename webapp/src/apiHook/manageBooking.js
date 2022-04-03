const host = "http://localhost:5000";

// get booking for that user
// return array of requested bookings
async function getBookings(requestBody){
  const url = host + "/api/get-bookings";

  const request = new Request(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  return await fetch(request)
    .then(res => res.json())
    .then(json => {
      return json.isConfirmedBooking;
      })

}

// PATCH request to update booking
// return true on success, false otherwise
async function updateBooking(bookingId, requestBody) {
  const url = host + "/api/bookings/" + bookingId;

  const request = new Request(url, {
    method: "PATCH",
    credentials: "same-origin",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });

  return await fetch(request)
    .then((res) => {
      if (res.ok) {
        return true;
      } else {
        throw new Error("update booking status not ok");
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    })
}

// DELETE request to cancel booking
// return true if success, false otherwise
async function cancelBooking(bookingId){
  const url = host + "/api/bookings/" + bookingId;
  const request = new Request(url, {
    method: "DELETE",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });

  return await fetch(request)
    .then((res) => {
      if (res.ok) {
        return true;
      } else {
        throw new Error("status not ok");
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    })
}

// get Image url from backend
// return url
async function getImageLink(imageId){
  const url = host + "/api/images/" + imageId;
  const request = new Request(url, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      Accept: "*/*",
    }
  });

  return await fetch(request)
    .then(res => res.json())
    .then(json => {
      console.log("fetching image", json.images.img)
      return json.images.img;
    })
    .catch((error) => {
      console.log("fetch image url failed")
    })

}

export { getBookings, updateBooking, cancelBooking, getImageLink }