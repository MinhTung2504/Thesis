import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export default function UserProfile() {
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

              <span className="font-weight-bold">Edogaru</span>
              <span className="text-black-50">edogaru@mail.com.my</span>
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
              <div className="row">
                <div className="col-md-12">
                  <label className="labels">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value=""
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label className="labels">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone number"
                    value=""
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label className="labels">City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value=""
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    value=""
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value=""
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value=""
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Birthday</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="education"
                    value=""
                  />
                </div>
              </div>

              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                >
                  Save Profile
                </button>
              </div>
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
