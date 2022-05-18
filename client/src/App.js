import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// components
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboards/Dashboard";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import Footer from "./components/Footer/Footer";
import CreateNewHouse from "./components/ActionHouses/CreateNewHouse";
import UpdateHouse from "./components/ActionHouses/UpdateHouse";
import PrivateRoute from "./components/PrivateRoute";
import SearchHouse from "./components/SearchHouse/SearchHouse";
import NotFound from "./components/NotFound";
import UserProfile from "./components/UserProfile/UserProfile";
import FilterHouses from "./components/FilterHouses/FilterHouses";
import CheckBooking from "./components/CheckBooking/CheckBooking";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/page/:pageNumber" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
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
        />
        <Route path="/search-house" element={<SearchHouse />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/houses-filter" element={<FilterHouses />} />
        <Route path="/check-booking/:houseId" element={<CheckBooking />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
