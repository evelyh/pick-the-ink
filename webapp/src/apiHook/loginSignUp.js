const host = "http://localhost:5000";
const log = console.log
// sign user up
function signUp(data){
  const url = host + "/api/users";
  const request = new Request(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  fetch(request).then((res) => {
    if (res.ok){
      return res.json();
    } else{
      // bad request
      alert("Sign up failed, please check all fields");
    }
  }).catch((error) => {
    console.log(error);
  })
}

// log user in
async function login(data){
  const url = host + "/users/login";
  const request = new Request(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await fetch(request).then(res => {
    if (res.status === 200) {
        console.log('Successfully logged in') 
        return res.json()
    } else {
        console.log('[Unsuccessful] logged in')
        return res.status
    }
}).
catch((error) => {
    log(error)
})
}

// check login user status
function loginStatus(){
  const url = host + "/users/login";
  const request = new Request(url, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      Accept: "*/*",
    }
  });

  fetch(request)
    .then(res => res.json())
    .then(json => {
      return json;
    })
}
 
async function getlogin(){
  const url = host + "/users/login";
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await fetch(request).then(res => {
    if (res.status === 200) {
        console.log('Successfully logged in') 
        return res.json()
    } else {
        console.log('[Unsuccessful] logged in')
        return res.status
    }
}).
catch((error) => {
    log(error)
})};

// sign user out
function logout(){
  const url = host + "/users/logout";
  const request = new Request(url, {
    method: "GET",
  });

  fetch(request).then((res) => {
    if (res.ok){
      return res.json();
    } else{
      alert("Logout failed. Please try again later");
    }
  }).catch((error) => {
    console.log(error);
  })
};

export { signUp, logout, login , getlogin, loginStatus}
