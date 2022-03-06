
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
import UserProfileKrab from './Pages/UserProfileKrab'
import UserProfileGary from './Pages/UserProfileGary'
import Calendar from 'Pages/Calendar';
import Admin from 'Pages/admin/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/managebooking" element={<ManageBooking />}/>
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/userprofile/krab" element={<UserProfileKrab />} />
        <Route path="/userprofile/gary" element={<UserProfileGary />} />
        <Route path="/artistprofile" element={<ArtistProfile />} />
        <Route path="/artistgallery" element={<ArtistGallery />}/>
        <Route path="/calendar" element={<Calendar />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Admin />}/>
      </Routes>
    </BrowserRouter>
    
  );
}
export default App;

