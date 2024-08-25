import './App.css';
import HomeComponent from './Components/HomeComponent/homeComponent';
import LoginComponnet from './Components/LoginComponent/loginComponnet';
import Navbar from './Components/NavBarComponent/navbar';
import {BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from "react-router-dom";
import ContactUs from './Components/ContactUsComponent/contactUs';
import RegistrationForm from './Components/register/registerComponent';
import AdminHomePage from './Dashboard/Admin/adminDashboard';
import DoctorHomePage from './Dashboard/doctor/doctorSideMenu';
import PatientHomePage from './Dashboard/Patient/patientSideMenu';
import ProfileView from './Dashboard/Patient/PatientProfile';
import PatientList from './Dashboard/Admin/PatientList';
import EditPatient from './Dashboard/Admin/editPatient';
import Demo from './Dashboard/Admin/demo';
import DoctorList from './Dashboard/Admin/doctorList';
import EditDoctor from './Dashboard/Admin/manageDoctor';
import RegisterPatient from './Dashboard/Admin/registerPatient';
import RegisterDoctor from './Dashboard/Admin/registerDoctor';
import PatientDashboard from './Dashboard/Patient/patientDashboard';
import PatientProfile from './Dashboard/Patient/patientDashboard';
import PatientPrescription from './Dashboard/Patient/patientPrescription';
import Search from 'antd/es/input/Search';
import SearchDoctors from './Dashboard/Patient/searchDoctors';
import PatientChats from './Dashboard/Patient/PatientChats';
import AppointmentBooking from './Dashboard/Patient/appointmentBooking';
import EditMyProfile from './Dashboard/Patient/updateProfile';
import MessagingComponent from './Dashboard/Patient/PatientChats';
import Chat from './Dashboard/Patient/PatientChats';
import AppointmentList from './Dashboard/Patient/appointmentList';
import DoctorProfile from './Dashboard/doctor/doctorProfile';
import Logout from './Dashboard/Admin/logout';



function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Define routes where the Navbar should not be displayed
  const hideNavbarRoutes = ['/admin', '/doctor/homepage', '/patient/homepage', '/admin/manageDoctor', '/patient/profile','/patient/list', '/patient/edit/', '/patient', 'patient/dashboard'];

  // Check if current path includes the dynamic segment
  const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route));

  const handleLogout = () => {
    // Clear any session or token here
    localStorage.removeItem('authToken'); // Example of clearing auth token
    navigate('/login'); // Redirect to login page
  };
  return (
   <>
    {!shouldHideNavbar && <Navbar />}
    <Routes>
      <Route path='/' element = {<HomeComponent/>} />
      <Route path='/login' element ={<LoginComponnet />}/>
      <Route path='/signUp' element ={<RegistrationForm />}/>
      <Route path='/contactUs' element ={<ContactUs />}/>
      <Route path='/doctor/homepage' element={<DoctorHomePage/>}/>
      <Route path='/patient/profile' element={<ProfileView/>}/>


      {/* <Route path='/admin/manageDoctor' element={<ManageDoc/>}/> */}
      {/* Admin Routes with Sidebar */}
      <Route path='/admin' element={<AdminHomePage />}>
        <Route path='patient/list' element={<PatientList />} />
        <Route path='doctor/list' element={<DoctorList />} />
        <Route path='patient/register' element={<RegisterPatient />} />
        <Route path='doctor/register' element={<RegisterDoctor />} />
        <Route path='doctor/edit/:doctorId' element={<EditDoctor />} />
        <Route path='patient/edit/:patientId' element={<EditPatient/>} />
      </Route>

      {/* Patient Routes with Sidebar */}
      <Route path='/patient' element={<PatientHomePage />}>
        {/* <Route path='dashboard' element={<PatientProfile />} /> */}
        <Route path='patient/prescription' element={<PatientPrescription />} />
        <Route path='patient/chats/:userId' element={<Chat />} />
        <Route path='patient/bookings' element={<AppointmentBooking />} />
        <Route path='patient/list' element={<AppointmentList />} />
        <Route path='patient/search' element={<SearchDoctors />} />
        <Route path='patient/profile' element={<ProfileView />} />
        <Route path='patient/edit/:patientId' element={<EditMyProfile/>} />

      </Route>
      {/* Doctor Routes with Sidebar */}
      <Route path='/doctor' element={<PatientHomePage />}>
        {/* <Route path='dashboard' element={<PatientProfile />} /> */}
        {/* <Route path='patient/prescription' element={<PatientPrescription />} /> */}
        {/* <Route path='patient/chats/:userId' element={<Chat />} /> */}
        {/* <Route path='patient/bookings' element={<AppointmentBooking />} /> */}
        {/* <Route path='patient/list' element={<AppointmentList />} /> */}
        {/* <Route path='patient/search' element={<SearchDoctors />} /> */}
        <Route path='doctor/profile' element={<DoctorProfile />} />
        {/* <Route path='patient/edit/:patientId' element={<EditMyProfile/>} /> */}

      </Route>
{/* Logout Route */}
        <Route path='/logout' element={<Logout handleLogout={handleLogout} />} />

    </Routes>
    
   </>
  );
}

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
