import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteHouse } from "../../../actions/house";
import HouseListTable from "../../HouseList/HouseListTable";

export default function HouseDashboard() {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const handleHouseDelete = async (houseId) => {
    if (!window.confirm("Are you sure?")) return;
    deleteHouse(token, houseId).then((res) => {
      toast.success("House Deleted!");
    });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10">{/* <h1>Your Houses</h1>  */}</div>
        <div className="col-md-2">
          <Link to="/house/new" className="btn btn-primary">
            Create A New House
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="table-responsive">
          <HouseListTable handleHouseDelete={handleHouseDelete} />
        </div>
      </div>
    </div>
  );
}
