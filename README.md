# team09

## Introduction
  - Website name: PickInk 
  - Description: a platform for tattoo artists and lovers

## Steps to run the app
  - Naviagte to dictionary `webapp\`
  - Run `npm install` to install all the neccessary packages
  - Run `npm start` to start the web app

## Pages

### *Explore* `/`
- Landing home page where allows users to browse artists and their selected work based on the filters including artists' locations, available dates, and styles they chose. 

### Manage Booking* `/managebooking`
- Page where allows user to manage their booking. They can delete or edit the information of their bookings.

### *Calendar* `/calendar`
- Page where allow users to keep track of their available data and time.

### *Profile*  
  - For cutomers, `/userprofile`
    - Regular profile pages containing basic info, i.e. username, full name, contact info, favourite styles, etc.. 
  - For artists, `/artistprofile` and `/artistgallery`
    - Artists' profile pages which contains all the basic info in regular profile pages and also some additional info for artists, i.e. home location, artists' styles.
  
  **Note (Important!):** 
  - For each user, he/she can only edit their own profile page (and gallery page, for artists), and view limited profile info on other users' profile page. 
  - For each artist, he/she cannot book an appoinment on their own profile/gallery page. 
  - The default logged in user is a customer. To switch to the artists' view for testing the features, please follow the steps:
    - Navigate to `\webapp\Pages\UserProfile.js`
    - Go to `Line 37`, change `const [isUser] = useState(true);` to `const [isUser] = useState(false);`
    - Navigate to `\webapp\Pages\ArtistGallery.js`
    - Go to `Line 45`, change `const [isUser] = useState(true);` to `const [isUser] = useState(false);`
    - Go to the page `\artistprofile`, to check the artist's view of their own profile
    - Go to the page `\artistGallery`, to check the artist's view of their own gallery

### *Admin Dashboard* "/admin"
- Admin can manage user accounts by suspending them or activating them.
- Admin can also view, approve, or reject uploaded certificates by users who want to be certificated as artists.

## Reference
- `\paper-kit-react-main` is a UI template used to help us customize our page
  - Link: https://demos.creative-tim.com/paper-kit-react/#/index
