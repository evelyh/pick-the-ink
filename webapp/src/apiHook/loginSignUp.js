const host = "http://localhost:5000";

// check login status
// return {loggedIn, isArtist, userId}
async function getLoginStatus() {
  const url = host + "/users/login";
  const request = new Request(url, {
    method: "GET",
    // credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json",
    },
  });

  return await fetch(request)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      return {
        loggedIn: json.loggedIn,
        isArtist: json.isArtist,
        userId: json.user,
      };
    });
}

// logs user in
// return {invalid}
async function login(requestBody) {
  const url = host + "/users/login";
  const request = new Request(url, {
    method: "POST",
    credentials: 'same-origin',
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      Accept: '*/*',
    },
  });

  return await fetch(request)
    .then((res) => {
      if (res.ok){
        return{
          invalid: false,
        };
      } else{
        // bad request
        return {
          invalid: true,
        };
      }
    })
    .catch((error) => {
      console.log(error);
      return {
        invalid: true,
      };
    })
}

// sign user up
// return {success} when success
//        {showFail} when failed
async function signup(requestBody){
  const url = host + "/api/users";
  const request = new Request(url, {
    method: "POST",
    credentials: 'same-origin',
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      Accept: '*/*',
      credentials: 'same-origin',
    },
  });

  return await fetch(request)
    .then((res) => {
      console.log(res)
      if (res.ok) {
        return {
          success: true,
        };
      } else {
        // bad request
        return {
          showFail: true,
        };
      }
    })
    .catch((error) => {
      console.log(error);
      return {
        showFail: true,
      };
    })
}

export { getLoginStatus, login, signup }