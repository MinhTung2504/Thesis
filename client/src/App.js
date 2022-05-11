import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// components
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboards/Dashboard";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import Footer from "./components/Footer/Footer";
import CreateNewHouse from "./components/ActionHouses/CreateNewHouse";
import UpdateHouse from "./components/ActionHouses/UpdateHouse";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page/:pageNumber" element={<Home />} />
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
