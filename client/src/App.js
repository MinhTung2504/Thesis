import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// components
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import SearchHouse from "./components/SearchHouse/SearchHouse";
import NotFound from "./components/NotFound";
import UserProfile from "./components/UserProfile/UserProfile";
import FilterHouses from "./components/FilterHouses/FilterHouses";
import CheckBooking from "./components/CheckBooking/CheckBooking";
import UserBooking from "./components/UserBooking/UserBooking";
import DashboardAdmin from "./components/DashboardAdmin/DashboardAdmin";
import ManageUsers from "./components/DashboardAdmin/views/ManageUsers";
import ManageHouses from "./components/DashboardAdmin/views/ManageHouses";
import DashboardHost from "./components/DashboardHost/DashboardHost";

import ManageBookings from "./components/DashboardHost/views/ManageBookings";
import ManageHostHouses from "./components/DashboardHost/views/ManageHostHouses/ManageHostHouses";
import CreateNewHostHouse from "./components/DashboardHost/views/ManageHostHouses/CreateNewHostHouse";
import EditHostHouse from "./components/DashboardHost/views/ManageHostHouses/EditHostHouse";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/page/:pageNumber" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/house/new"
          element={
            <PrivateRoute>
              <CreateNewHouse />
            </PrivateRoute>
          }
        />
        <Route
          path="/house/:houseId"
          element={
            <PrivateRoute>
              <HouseDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/house/edit/:houseId"
          element={
            <PrivateRoute>
              <UpdateHouse />
            </PrivateRoute>
          }
        /> */}
        <Route path="/search-house" element={<SearchHouse />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/houses-filter" element={<FilterHouses />} />
        <Route path="/check-booking/:houseId" element={<CheckBooking />} />
        <Route path="/user-booking" element={<UserBooking />} />
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/houses" element={<ManageHouses />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/host" element={<DashboardHost />} />
        <Route path="/host/houses" element={<ManageHostHouses />} />
        <Route path="/host/houses/new" element={<CreateNewHostHouse />} />
        <Route path="/host/houses/edit/:houseId" element={<EditHostHouse />} />
        <Route path="/host/bookings" element={<ManageBookings />} />
        <Route path="/host/dashboard" element={<DashboardHost />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
