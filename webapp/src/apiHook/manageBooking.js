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
// update timeslot so that it is not booked
// return true if success, false otherwise
async function cancelBooking(booking){

  // unbook timeslots
  const unbooked = await unbookTimeslots(booking.timeslots);
  if (!unbooked){
    return false;
  }

  const url = host + "/api/bookings/" + booking._id;
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
      return json.images.img;
    })
    .catch((error) => {
      console.log("fetch image url failed")
    })

}

// extract date string from timeslot if exist
async function getBookingTimeString(timeslots){
  const times = [];

  for (let i = 0; i < timeslots.length; i++) {
    const url = host + "/api/timeslots/" + timeslots[i];
    const request = new Request(url, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        Accept: "*/*",
      }
    });

    await fetch(request)
      .then(res => res.json())
      .then(json => {
        times.push(new Date(json.result.startTime));
      })
      .catch((error) => {
        alert("cannot get time");
      })
  }

  // set start-time and end-time
  times.sort((date1, date2) => date1 - date2);
  const bookingStart = times[0].toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false});
  const bookingStartDateObj = new Date(times[0]);
  const bookingEndDateObj = new Date(times[times.length - 1].getTime());
  bookingEndDateObj.setHours(bookingEndDateObj.getHours() + 1);
  const bookingEnd = bookingEndDateObj.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false});
  return {
    bookingStartDateObj: bookingStartDateObj,
    bookingEndDateObj: bookingEndDateObj,
    bookingTimeString: bookingStart + " - " + bookingEnd,
  };
}

// get user's name given Id
// mode: "artist" or "customer"
// if artist: return {artistName}
// if customer: return {customerName, customerEmail, customerPhone}
async function getUserInfo(mode, userId){
  const url = host + "/api/users/" + userId;
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
      if (mode === "artist"){
        return {
          artistName: json.firstName + " " + json.lastName,
        }
      } else if (mode === "customer"){
        return {
          customerName: json.firstName + " " + json.lastName,
          customerEmail: json.email,
          customerPhone: json.phoneNum,
        }
      }
    })
    .catch((error) => {
      alert("Cannot get user name");
    })

}

// get artist availability
// return {
// availableLocations: list of strings, available locations, sorted alphabetically
// availabilityAtLocations: {location: list of list, each inner list contain timeslots of the same day}
// }
async function getArtistAvailability(artistId){
  // fetch timeslots wrt artistID and isBooked == false
  const url = host + `/api/timeslots/?artistID=${artistId}&isBooked=false`;
  const request = new Request(url, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      Accept: "*/*",
    }
  });

  const timeslotList =  await fetch(request)
                                .then((res) => res.json())
                                .then((json) => json.result)

  // fetch for all locations in database
  const locationUrl = host + "/api/locations";
  const locationRequest = new Request(locationUrl, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      Accept: "*/*",
    }
  });

  const availableLocations = [];
  const availabilityAtLocations = {};
  const locationList = await fetch(locationRequest)
                              .then((res) => res.json())
  for (let i = 0; i < locationList.length; i++){
    const filteredTimeslots = timeslotList.filter((timeslot) => {
      return locationList[i]._id === timeslot.locationID;
    });
    if (filteredTimeslots.length > 0){
      // sort by time
      filteredTimeslots.sort(function (a, b){
        return new Date(a.startTime) - new Date(b.startTime);
      })

      // filter such sorted according to days
      const availabilityHere = [];
      let j = 0;
      while (j < filteredTimeslots.length){
        const currDate = new Date(filteredTimeslots[j].startTime);
        const filteredWithCurrDate = filteredTimeslots.filter((timeslot) => {
          return new Date(timeslot.startTime).toDateString() === currDate.toDateString();
        })
        // disregard if earlier than tomorrow
        if (currDate <= new Date()){
          j += filteredWithCurrDate.length;
        } else{
          availabilityHere.push(filteredWithCurrDate);
          j += filteredWithCurrDate.length;
        }
      }

      availableLocations.push(locationList[i].country + ", " + locationList[i].region);
      availabilityAtLocations[locationList[i].country + ", " + locationList[i].region] = availabilityHere;
    }
  }

  availableLocations.sort();
  return {"availableLocations": availableLocations, "availabilityAtLocations": availabilityAtLocations};

}

// confirm a booking by setting a time for booking (populate Booking.timeslots)
async function confirmBooking(customerId, timeslots, bookingId){

  try{
    // update timeslots
    for (let i = 0; i < timeslots.length; i++){
      const url = host + "/api/timeslots/" + timeslots[i];
      const requestBody = {
        isBooked: true,
        customerID: customerId,
      };
      const request = new Request(url, {
        method: "PATCH",
        credentials: "same-origin",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      await fetch(request)
        .then(res => {
          if (!res.ok) {
            throw new Error("patch timeslot not ok")
          }
        })
    }
  } catch (e){
    console.log(e);
    return false;
  }


  // update booking
  const url = host + "/api/bookings/" + bookingId;
  const requestBody = {
    timeslots: timeslots,
    isConfirmed: true,
  };
  const request = new Request(url, {
    method: "PATCH",
    credentials: "same-origin",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  return await fetch(request)
    .then(res => {
      return res.ok;
    })
    .catch((error) => {
      console.log(error);
      return false;
    })

}

// used when modifying booking
// unbook original timeslots in booking
async function unbookTimeslots(timeslots){
  try{
    // update timeslots
    for (let i = 0; i < timeslots.length; i++){
      const url = host + "/api/timeslots/" + timeslots[i];
      const requestBody = {
        isBooked: false,
        customerID: null,
      };
      const request = new Request(url, {
        method: "PATCH",
        credentials: "same-origin",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      await fetch(request)
        .then(res => {
          if (!res.ok) {
            throw new Error("patch timeslot not ok")
          }
        })
    }
    return true;
  } catch (e){
    console.log(e);
    return false;
  }
}

export { getBookings,
         updateBooking,
         cancelBooking,
         getImageLink,
         getBookingTimeString,
         getUserInfo,
         getArtistAvailability,
         unbookTimeslots,
         confirmBooking
       }