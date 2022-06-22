import { DatePicker } from "antd";
import moment from "moment";
import React from "react";

export default function FormProfile(props) {
    const { values, handleChange, setValues, handleSubmit } = props;

    const { name, email, phone, city, country, address, birthday } = values;
    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-12">
                    <label className="labels">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <label className="labels">Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        onChange={handleChange}
                        placeholder="Phone"
                        className="form-control"
                        value={phone}
                    ></input>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <label className="labels">City</label>
                    <input
                        type="text"
                        name="city"
                        className="form-control"
                        placeholder="City"
                        value={city}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label className="labels">Country</label>
                    <input
                        type="text"
                        name="country"
                        className="form-control"
                        placeholder="Country"
                        value={country}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-12">
                    <label className="labels">Address</label>
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="Address"
                        value={address}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-12">
                    <label className="labels">Email</label>
                    <input
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        disabled
                    />
                </div>
                <div className="col-md-12">
                    <label className="labels">Birthday</label>
                    {birthday ? (
                        <input
                            type="date"
                            className="form-control"
                            name="birthday"
                            value={moment(birthday).format("YYYY-MM-DD")}
                            onChange={handleChange}
                        />
                    ) : (
                        <input
                            type="date"
                            className="form-control"
                            name="birthday"
                            onChange={handleChange}
                        />
                    )}
                </div>
            </div>

            <div className="mt-5 text-center">
                <button className="btn btn-primary profile-button">Save Profile</button>
            </div>
        </form>
    );
}
