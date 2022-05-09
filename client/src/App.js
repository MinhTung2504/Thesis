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
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/house/new" element={<CreateNewHouse />} />
        <Route exact path="/house/:houseId" element={<HouseDetail />} />
        <Route exact path="/house/edit/:houseId" element={<UpdateHouse />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
