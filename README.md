# team09

## Introduction
  - Website name: **PickInk**
  - Description: a community for tattoo artists and lovers

### *Roles and functionalities of Users*
 - As a regular user, they can
     - find artists by applying their favoured conditions (e.g. styles, locations, availablity)
     - book appointment with artists
     - modify their bookings
     - follow a user (mostly artists as they regularly update new tattoo works)
 - As a artist user, they have all regular user functionalities and can also
     - upload their tattoo artworks
     - provide their current working locations (as most artist regularly work as guest artists in different places)
     - provide their specialized art styles

## Website pages
  - `https://`

### *Explore* `/ & /explore`
- Landing home page where allows users to browse artists and their selected work based on the filters including artists' locations, available dates, and styles they chose.
- Among the results, you can go to the artists' profile pages by clicking their username. 

### *Sign Up* `/signup`
  - Sign up for the webapp
  - Click on the signup on the Navbar, and signup by filling the form
  - For all users, a unique username and email are required. For artists, a piece of ID and their tattoo practice license is required.

### *Login* `/login`
  - Logging in to the webapp
  - Fill in the username and passwords to login
  - Sample Credential:
      - username: `user`
      - password: `user`

### *Admin Site* `/admin`
- Admin can manage artist accounts by reviewing their IDs, tattoo practice license, and approve or reject their accounts as an artist.
- Only credential:
    - username: `admin`
    - password: `admin`  
- The login paths for admin and regular user are not interchangable.


### *Profile*  
  - For customers, `/userprofile`
    - Regular profile pages containing basic info, i.e. username, full name, contact info, favourite styles, etc.. 
    - Features on the pages:
      - Profile Card
        - The profile card on the left of the page showing the profile photo, bio, followers and followings
        - A list of followers/followings will show when clicking the followers/followings on the card
        - You can naviagte to the followers'/followings' profile pages by clicking the dropdown lists of the followers/followings
      - Edit your profile
        - Users can edit their own profile on this page by clicking the `Edit your profile` button and fill in the popup form
        - The editProfile form will update the change if users click on `comfirm`, otherwise, all the info will stay as previous
      
  - For artists, `/artistprofile` and `/artistgallery`
    - Artists' profile pages which contains all the basic info in regular profile pages and also some additional info for artists, i.e. home location, artists' styles.
    - Users' views:
      - Book an appoitment (artist's profile page)
        - Book an appoitment by filling up the popup form.
      - Gallery (artist's profile page)
        - Navigate to the artist's gallery
    - Artists' views:
      - Edit your profile (artist's profile page)
        - Similar to the edit profile for customer
      - Gallery (artist's profile page)
        - Navigate to the artist's gallery
      - Edit the my gallery (artist's gallery page)
        - Edit the titles and descriptions of any image showing on the page by filling up the popup form
        - When click the `confirm` button on the popup form, the info of the image will change; when click on the `cancel`, info will stay as previous
      - Add image to my gallery (artist's gallery page)
        - Add new image to the gallery, by uploading the your own image and filling the popup form.
      - Delete image from my gallery(artist's gallery page)
        - Delete images from your gallery
        - By clicking the `delete` button in the popup, you are confirming the deletion, otherwise, the image will stay. 
  
    **Notes for Profile (Important!):** 
    - For each user, he/she can only edit their own profile page (and gallery page, for artists), and view limited profile info on other users' profile page. 
    - Both customers and artists can book appoinments on and only on other artists
    - For each artist, he/she cannot book an appoinment on their own profile/gallery page. 

### *Manage Booking* `/managebooking`
- Page that allows user to manage their booking.

- For customers,
  - view all booking requests (pending bookings)
  - cancel a booking that is yet to be heard back from artist
  - pick a time for the appointment after artist get back with the time needed for the specified tattoo
  - view confirmed bookings
  
- For artists,
  - view new booking requests
  - send an estimated duration needed for the specified tattoo
  - suggest an alternate time for an appointment
  - confirm an appointment with the client after the client picked a time
  - view confirmed bookings
  - cancel bookings

> Note: Default is the client's view. To redirect to the artist's view, go to the url `/artist-managebooking`. Clicking 
> on the `Manage Booking` tab on the navigation bar will take you back to default view.

### *Calendar* `/calendar`
- Page where allow users to keep track of their available data and time.
- Click on each appointments showing on the calendar to see details
- Click the edit/delete button on the upper-right popup of each appoitment to edit/delete the appointment

## Testing Instructions

### Backend

- Backend Host URL: `https://`

- Admin model: (No other methods allowed to check, add, or modify the admin information. There is only one account.)
    - `/admin/login`
        - POST, Body: `{username, password}`
            - To log in as an admin, with success return `{token: 'loggedIn'}`, otherwise `{token: null}`

- User model: 
    - `/api/users`
        - GET
            - With success return a list of all existign User objects
        - POST, Body: `{userName, password, email, firstName, lastName, birthDate}`
            - With success return newly created User object
    - `/api/users/:id`
        - GET
            - With success return corresponding User object with this id
        - PUT
            - With success return corresponding modified User object with this id
    - `/users/login`
        - POST, Body: `{username, password}`
        - GET
            - shouldn't be done through Postman
    - `/users/logout`
        - GET
            - shouldn't be done through Postman
    -  `/api/artists`
        - GET, Query parameters: (everything is optional) `?style={a list of Style object IDs}&location={a Location object ID}`
            - With success return a corresponding list of User objects

- Style model:
    - `/api/styles`
        - GET
            - With success returns a list of all existign Style objects
        - POST, Body: `{name}`
            - With success return newly created Style object
    - `/api/styles/:id`
        - GET
            - With success return corresponding Location object with this id

- Location model:
    - `/api/locations`
        - GET, Query parameters: (optional as a whole) `?country={countryName}&region={regionName}`
            - With success return a list of all existing Location objects or a Location object if there's query
        - POST, Body: `{country, region}`
            - With success return newly created Location object
    - `/api/locations/:id`
        - GET
            - With success return corresponding Location object with this id

- Timeslot model:
    - `/api/timeslots`
    - `/api/timeslots/:id`
    - `/api/timeslot` 
        - GET, Query parameters: (required) `?start={startTime}&end={endTime}`
            - With success, return a list of Timeslot objects in the period
- Image model:
- Booking model:

### Frontend
- From root directory, navigate to `/webapp`, run  `npm i` and `npm run build` to build the React app
- Move the generated folder `/build` in `/webapp` to `../backend`
- Navigate to `../backend`, run `npm i` and `node server.js` to start the app by local server
- Now access the web app thru `localhost:5000/`

## Reference
- The UI template used to help us customize our page
  - Link: https://demos.creative-tim.com/paper-kit-react/#/index
- Canlendar used to keep track of their available datetimes
  - Link: http://cdn.syncfusion.com/ej2/material.css
- Flatlist in react (react-flatlist)
  - Link: https://github.com/ecorreiadev/flatlist-react/
- react-icons 
  - Link: https://react-icons.github.io/react-icons/
- Lists of countries and region used to browse artists
  - Link: https://github.com/country-regions/react-country-region-selector
