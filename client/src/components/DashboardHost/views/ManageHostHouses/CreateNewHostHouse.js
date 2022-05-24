import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createNewHouse } from "../../../../actions/house";
import HouseCreateForm from "../../../Forms/House/HouseCreateForm";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function CreateNewHostHouse() {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  let navigate = useNavigate();
  const [values, setValues] = useState({
    title: "",
    content: "",
    address: "",
    city: "",
    image: "",
    price: "",
    num_beds: "",
    size: "",
    max_guests: "",
    num_bedrooms: "",
    num_bathrooms: "",
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
      console.log(res);
      toast.success("New House is posted");
      navigate("/host/houses");
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
  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="main-panel">
          <Header />
          <div className="content">
            <div className="row">
              <h4 className="text-center">Create New House</h4>
              <div className="col-md-8">
                <br />
                <HouseCreateForm
                  values={values}
                  setValues={setValues}
                  handleChange={handleChange}
                  handleImageChange={handleImageChange}
                  handleSubmit={handleSubmit}
                />
              </div>
              <div className="col-md-4 text-center">
                <label className="m-5">Preview Images:</label>
                <div
                  className="imagesss"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                  }}
                >
                  {imageSelected &&
                    imageSelected.map((image, index) => {
                      return (
                        <div
                          key={image}
                          className="imageNe"
                          style={{
                            margin: "1rem 0.5rem",
                            position: "relative",
                          }}
                        >
                          <img
                            src={image}
                            height="120"
                            width="180"
                            alt="imagePreview"
                          />
                          <p>{index + 1}</p>
                        </div>
                      );
                    })}
                </div>
                <div className="text-center">
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
        </div>
      </div>
    </>
  );
}
