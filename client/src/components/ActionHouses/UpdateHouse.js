import React, { useState, useEffect } from "react";
import HouseUpdateForm from "../Forms/House/HouseUpdateForm";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getHouseById, updateHouse } from "../../actions/house";
// import { rootShouldForwardProp } from "@mui/material/styles/styled";

export default function UpdateHouse() {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
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

  // const [imageSelected, setImageSelected] = useState([]);

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
  } = values;

  const params = useParams();

  useEffect(() => {
    loadHouseForUpdate();
  }, []);

  // const handleBodyContent = (e) => {
  //   setValues({ ...values, content: e });
  // };

  const loadHouseForUpdate = async () => {
    let res = await getHouseById(params.houseId);
    // console.log(res.data);
    // res.data && setValues({ ...values, ...res.data });
    const newValues = { ...values, ...res.data };
    // console.log(newValues);
    setValues(newValues);
    // setValues((prev) => {
    //   console.log({ ...prev, ...res.data });
    //   return { ...prev, ...res.data };
    // });
  };

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
    // for (const key of Object.keys(image)) {
    //   houseData.append("image", image[key]);
    // }

    // console.log([...houseData]);
    // const testData = [...houseData];
    // console.log(testData);
    try {
      let res = await updateHouse(token, values, params.houseId);
      console.log(values);
      console.log(res.data);
      // console.log([...houseData]);

      toast.success(`${res.data.title} is updated`);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2 className="p-5">Update House</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md">
            <br />
            <HouseUpdateForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
}
