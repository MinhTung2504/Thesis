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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/page/:pageNumber" element={<Home />} />
        <Route index path="/login" element={<Login />} />
        <Route index path="/register" element={<Register />} />
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route index path="/house/new" element={<CreateNewHouse />} />
        <Route index path="/house/:houseId" element={<HouseDetail />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
