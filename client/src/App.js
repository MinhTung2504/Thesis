import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// components
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import PrivateRoute from "./components/PrivateRoute";
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
        <Route path="/search-house" element={<SearchHouse />} />
        <Route path="/houses-filter" element={<FilterHouses />} />
        <Route path="/house/:houseId" element={<HouseDetail />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/user-profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/check-booking/:houseId"
          element={
            <PrivateRoute>
              <CheckBooking />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-booking"
          element={
            <PrivateRoute>
              <UserBooking />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <DashboardAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <ManageUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/houses"
          element={
            <PrivateRoute>
              <ManageHouses />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <DashboardAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/host"
          element={
            <PrivateRoute>
              <DashboardHost />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/houses"
          element={
            <PrivateRoute>
              <ManageHostHouses />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/houses/new"
          element={
            <PrivateRoute>
              <CreateNewHostHouse />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/houses/edit/:houseId"
          element={
            <PrivateRoute>
              <EditHostHouse />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/bookings"
          element={
            <PrivateRoute>
              <ManageBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/dashboard"
          element={
            <PrivateRoute>
              <DashboardHost />
            </PrivateRoute>
          }
        />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
