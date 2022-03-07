# team09

## Introduction
  - Website name: PickInk 
  - Description: a platform for tattoo artists and lovers

## Steps to run the app
  - Naviagte to directory: `\webapp\`
  - Run `npm install` to install all the neccessary packages
  - Run `npm start` to start the web app

## Pages

### *Explore* `/`
- Landing home page where allows users to browse artists and their selected work based on the filters including artists' locations, available dates, and styles they chose. 

### *Manage Booking* `/managebooking`
- Page where allows user to manage their booking. They can delete or edit the information of their bookings.

### *Calendar* `/calendar`
- Page where allow users to keep track of their available data and time.
- Click on each appointments showing on the calendar to see details
- Click the edit/delete button on the upper-right popup of each appoitment to edit/delete the appointment

### *Profile*  
  - For cutomers, `/userprofile`
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
  
  **Note (Important!):** 
  - For each user, he/she can only edit their own profile page (and gallery page, for artists), and view limited profile info on other users' profile page. 
  - Both customers and artists can book appoinments on and only on other artists
  - For each artist, he/she cannot book an appoinment on their own profile/gallery page. 
  - The default logged in user is a customer, thus, all the pages are showing the views of that customer. To switch to the artists' view for testing the features, please follow the steps:
    - Navigate to `\webapp\Pages\AritistProfile.js`
    - Go to `Line 39`, change `const [isUser] = useState(true);` to `const [isUser] = useState(false);`
    - Navigate to `\webapp\Pages\ArtistGallery.js`
    - Go to `Line 45`, change `const [isUser] = useState(true);` to `const [isUser] = useState(false);`
    - Go to the page `\artistprofile`, to check the artist's view of their own profile
    - Go to the page `\artistGallery`, to check the artist's view of their own gallery
  - Our web app does not have any database in this stage, the two images on the artist's gallery page is hard coded for now to show a better and expected appearance of a normal gallery. Thus, these two images will show everytime you reload the page. All the bugs regrading to the hard coded will be fixed when we implement the databases in the following weeks. 

### *Admin Dashboard* "/admin"
- Admin can manage user accounts by suspending them or activating them.
- Admin can also view, approve, or reject uploaded certificates by users who want to be certificated as artists.

## Reference
- The UI template used to help us customize our page
  - Link: https://demos.creative-tim.com/paper-kit-react/#/index
- Canlendar used to keep track of their available datetimes
  - Link: http://cdn.syncfusion.com/ej2/material.css
