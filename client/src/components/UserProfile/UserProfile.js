import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createRequest } from "../../actions/requestToBecomeHost";

import { editUserProfile, getUserProfile } from "../../actions/user";
import { ROLES } from "../../utils";
import Footer from "../Footer/Footer";
import FormProfile from "../Forms/Profile/FormProfile";
import Header from "../Header/Header";
import RequestModal from "./Modal/RequestModal";

export default function UserProfile() {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  console.log(token);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    address: "",
    birthday: "",
  });

  const [contentRequest, setContentRequest] = useState("");

  const { name, email, phone, city, country, address, birthday } = values;

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    const res = await getUserProfile(token);
    console.log(res);
    // setProfile(res.data);
    const newValues = { ...values, ...res.data };
    // console.log(newValues);
    setValues(newValues);
  };

  const handleSendRequest = async (data) => {
    try {
      let res = await createRequest(token, data);
      console.log(res);
      toast.success("Your request is sent");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.data);
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      let res = await editUserProfile(token, values);
      toast.success(`Updated successfully!`);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleContentRequest = (e) => {
    setContentRequest(e.target.value);
  };

  return (
    <>
      <Header type="" />
      <div className="container rounded mb-5 bg-light">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                alt="ava-user"
              />

              <span className="font-weight-bold">{name}</span>
              <span className="text-black-50">{email}</span>
              <br />
              <input type="file" className="form-control"></input>
              <h8>Upload a different photo...</h8>
            </div>
          </div>

          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <FormProfile
                values={values}
                setValues={setValues}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <h4>Change Password</h4>
              </div>
              <div className="col-md-12">
                <label className="labels">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Current Password"
                />
              </div>
              <div className="col-md-12">
                <label className="labels">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm New Password"
                />
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                >
                  Change Password
                </button>
              </div>
            </div>
            {auth.user.role === ROLES.USER && (
              <div className="p-3 border border-warning">
                <div className="text-center">
                  <h4 className="text-danger bold">
                    Create Request To Become Host
                  </h4>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary profile-button"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#requestModal"
                  >
                    Create Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <RequestModal
        handleSendRequest={handleSendRequest}
        handleContentRequest={handleContentRequest}
        contentRequest={contentRequest}
      />
      <Footer />
    </>
  );
}
