
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from './Pages/LandingPage'
import ArtistGallery from './Pages/ArtistGallery'
import ArtistProfile from './Pages/ArtistProfile'
import Login from './Pages/Login'
import ManageBooking from './Pages/ManageBooking'
import SignUp from './Pages/SignUp'
import UserProfile from './Pages/UserProfile'
import Calendar from 'Pages/Calendar';
import ManageBookingConfirm from "./Pages/ManageBookingConfirm";
import Admin from 'Pages/Admin';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path={"/explore"} element={<LandingPage />} />
        <Route path="/managebooking" element={<ManageBooking />}/>
        <Route path="/managebooking-confirm" element={<ManageBookingConfirm />}/>
        <Route path="/userprofile/:id" element={<UserProfile />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/artistprofile" element={<ArtistProfile />} />
        <Route path="/artistprofile/:id" element={<ArtistProfile />} />
        <Route path="/artistgallery" element={<ArtistGallery />}/>
        <Route path="/artistgallery/:id" element={<ArtistGallery />}/>
        <Route path="/calendar" element={<Calendar />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
    
  );
}



export default App;

