import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// components
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import UserProfile from "./components/UserProfile/UserProfile";
import FilterHouses from "./components/FilterHouses/FilterHouses";
import CheckBooking from "./components/CheckBooking/CheckBooking";
import UserBooking from "./components/UserBooking/UserBooking";
import DashboardAdmin from "./components/DashboardAdmin/DashboardAdmin";
import ManageUsers from "./components/DashboardAdmin/views/ManageUsers";
import ManageHouses from "./components/DashboardAdmin/views/ManageHouses";
import DashboardHost from "./components/DashboardHost/DashboardHost";
import ManageHostHouses from "./components/DashboardHost/views/ManageHostHouses/ManageHostHouses";
import CreateNewHostHouse from "./components/DashboardHost/views/ManageHostHouses/CreateNewHostHouse";
import EditHostHouse from "./components/DashboardHost/views/ManageHostHouses/EditHostHouse";
import { ROLES } from "./utils";
import Unauthorized from "./components/Unauthorized";
import ManageBookings from "./components/DashboardHost/views/ManageBookings/ManageBookings";
import SuccessPayment from "./components/Payment/SuccessPayment/SuccessPayment";
import CancelPayment from "./components/Payment/CancelPayment/CancelPayment";
import PrivacyPolicy from "./components/InfoPages/PrivacyPolicy";
import AboutUs from "./components/InfoPages/AboutUs";
import Reports from "./components/DashboardHost/views/Reports/Reports";


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/page/:pageNumber" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/houses-filter" element={<FilterHouses />} />
        <Route path="/house/:houseId" element={<HouseDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/user-profile"
          element={
            <PrivateRoute allowedRoles={[ROLES.USER, ROLES.HOST, ROLES.ADMIN]}>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/check-booking/:houseId"
          element={
            <PrivateRoute allowedRoles={[ROLES.USER, ROLES.HOST, ROLES.ADMIN]}>
              <CheckBooking />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-booking"
          element={
            <PrivateRoute allowedRoles={[ROLES.USER, ROLES.HOST, ROLES.ADMIN]}>
              <UserBooking />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
              <DashboardAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
              <ManageUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/houses"
          element={
            <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
              <ManageHouses />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
              <DashboardAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/host"
          element={
            <PrivateRoute allowedRoles={[ROLES.HOST]}>
              <DashboardHost />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/houses"
          element={
            <PrivateRoute allowedRoles={[ROLES.HOST]}>
              <ManageHostHouses />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/houses/new"
          element={
            <PrivateRoute allowedRoles={[ROLES.HOST]}>
              <CreateNewHostHouse />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/houses/edit/:houseId"
          element={
            <PrivateRoute allowedRoles={[ROLES.HOST]}>
              <EditHostHouse />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/bookings"
          element={
            <PrivateRoute allowedRoles={[ROLES.HOST]}>
              <ManageBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/reports"
          element={
            <PrivateRoute allowedRoles={[ROLES.HOST]}>
              <Reports />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/dashboard"
          element={
            <PrivateRoute allowedRoles={[ROLES.HOST]}>
              <DashboardHost />
            </PrivateRoute>
          }
        />
        <Route
          path="/success-payment/:bookingId"
          element={
            <PrivateRoute allowedRoles={[ROLES.USER, ROLES.HOST, ROLES.ADMIN]}>
              <SuccessPayment />
            </PrivateRoute>
          }
        />
        <Route
          path="/cancel-payment"
          element={
            <PrivateRoute allowedRoles={[ROLES.USER, ROLES.HOST, ROLES.ADMIN]}>
              <CancelPayment />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
