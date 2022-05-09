import React from "react";
import ReactQuill from "react-quill";

export default function HouseUpdateForm(props) {
  const { values, handleChange, handleSubmit, setValues, handleBodyContent } =
    props;

  const {
    title,
    content,
    price,
    address,
    num_beds,
    size,
    max_guests,
    city,
    num_bedrooms,
    num_bathrooms,
  } = values;
  return (
    <form onSubmit={handleSubmit}>
      {/* <div className="form-group">
        <label className="m-2" htmlFor="inputTitle">
          Images:
        </label>
        <input
          type="file"
          multiple
          className="form-control m-2"
          onChange={handleImageChange}
          name="image"
        ></input>
      </div> */}
      <div className="form-group">
        {/* <label className="btn btn-outline-secondary btn-lock m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label> */}

        <label className="m-2" htmlFor="inputTitle">
          Title:
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        ></input>
      </div>

      <div className="form-group">
        <label className="m-2" htmlFor="inputContent">
          Content:
        </label>
        <ReactQuill
          className="form-control m-2"
          // onChange={(value) => setValues({ ...values, content: value })}
          // onChange={handleBodyContent}
          value={content}
        />
      </div>

      <div className="row">
        <div className="form-group col-md-8">
          <label className="m-2" htmlFor="inputAdress">
            Address:
          </label>
          <input
            type="text"
            name="address"
            onChange={handleChange}
            placeholder="Address"
            className="form-control m-2"
            value={address}
          ></input>
        </div>
        <div className="form-group col-md-4">
          <label className="m-2" htmlFor="inputAdress">
            City:
          </label>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            placeholder="City"
            className="form-control m-2"
            value={city}
          ></input>
        </div>
      </div>

      <div className="row">
        <div className="form-group col-md-6">
          <label className="m-2" htmlFor="inputPrice">
            Price (VNĐ):
          </label>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            placeholder="Price"
            className="form-control m-2"
            value={price}
          ></input>
        </div>

        <div className="form-group col-md-6">
          <label className="m-2" htmlFor="inputPrice">
            Property Size (m2):
          </label>
          <input
            type="number"
            name="size"
            onChange={handleChange}
            placeholder="Property Size"
            className="form-control m-2"
            value={size}
          ></input>
        </div>
      </div>

      <div className="row">
        <div className="form-group col-md-3">
          <label className="m-2" htmlFor="inputPrice">
            Number of Beds:
          </label>
          <input
            type="number"
            name="num_beds"
            onChange={handleChange}
            placeholder="How many beds?"
            className="form-control m-2"
            value={num_beds}
          ></input>
        </div>
        <div className="form-group col-md-3">
          <label className="m-2" htmlFor="inputPrice">
            Maximum of Guests:
          </label>
          <input
            type="number"
            name="max_guests"
            onChange={handleChange}
            placeholder="Max Guests?"
            className="form-control m-2"
            value={max_guests}
          ></input>
        </div>
        <div className="form-group col-md-3">
          <label className="m-2" htmlFor="inputPrice">
            Number of Bedrooms:
          </label>
          <input
            type="number"
            name="num_bedrooms"
            onChange={handleChange}
            placeholder="Bedrooms?"
            className="form-control m-2"
            value={num_bedrooms}
          ></input>
        </div>
        <div className="form-group col-md-3">
          <label className="m-2" htmlFor="inputPrice">
            Number of Bathrooms:
          </label>
          <input
            type="number"
            name="num_bathrooms"
            onChange={handleChange}
            placeholder="Bathrooms?"
            className="form-control m-2"
            value={num_bathrooms}
          ></input>
        </div>
      </div>

      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );
}
