import React, { useState } from "react";
import { createNewHouse } from "../../actions/house";
import HouseCreateForm from "../Forms/House/HouseCreateForm";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./CreateNewHouse.css";

export default function CreateNewHouse() {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [values, setValues] = useState({
    title: "This is a test of creating house",
    content: "The house is nice",
    address: "12 Bach Dang",
    city: "Da Nang",
    image: "",
    price: "550000",
    num_beds: "2",
    size: "60",
    max_guests: "4",
    num_bedrooms: "2",
    num_bathrooms: "1",
  });

  const [imageSelected, setImageSelected] = useState([]);

  const {
    title,
    content,
    address,
    city,
    price,
    num_beds,
    size,
    max_guests,
    num_bedrooms,
    num_bathrooms,
    image,
  } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let houseData = new FormData();
    houseData.append("title", title);
    houseData.append("content", content);
    houseData.append("address", address);
    houseData.append("city", city);
    houseData.append("price", price);
    houseData.append("num_beds", num_beds);
    houseData.append("size", size);
    houseData.append("max_guests", max_guests);
    houseData.append("num_bedrooms", num_bedrooms);
    houseData.append("num_bathrooms", num_bathrooms);
    for (const key of Object.keys(image)) {
      houseData.append("image", image[key]);
    }

    console.log([...houseData]);

    try {
      let res = await createNewHouse(token, houseData);
      // console.log(res);
      toast.success("New House is posted");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    console.log(e.target.files);
    const files = e.target.files;
    setValues({ ...values, image: files });
    if (e.target.files) {
      const imageArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImageSelected((prevImages) => prevImages.concat(imageArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };
  // const handleBodyContent = (e) => {
  //   setValues({ ...values, content: e });
  // };
  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2 className="p-5">Create New House</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <HouseCreateForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              // handleBodyContent={handleBodyContent}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
          <div className="col-md-6">
            <label className="m-5">Preview Images:</label>
            <div className="images">
              {imageSelected &&
                imageSelected.map((image, index) => {
                  return (
                    <div key={image} className="image">
                      <img src={image} height="200" alt="imagePreview" />

                      <p>{index + 1}</p>
                    </div>
                  );
                })}
              {image && (
                <button
                  onClick={() => {
                    setImageSelected([]);
                    setValues({ ...values, image: "" });
                  }}
                >
                  Delete Images
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
