import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// components
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import HostDashboard from "./components/Dashboards/HostDashboard";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import HouseList from "./components/HouseList/HouseList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/page/:pageNumber" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/host-dashboard" element={<HostDashboard />} />
        <Route exact path="/house/:houseId" element={<HouseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
