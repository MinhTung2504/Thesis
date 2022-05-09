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
    console.log(res.data);
    // const datares = res.data;
    // console.log(datares);
    // console.log(...datares);
    res.data && setValues({ ...values, ...res.data });
    // setValues({
    //   ...values,
    //   title: res.data.title,
    //   content: res.data.content,
    //   address: res.data.address,
    //   city: res.data.city,
    //   price: res.data.price,
    //   num_beds: res.data.num_beds,
    //   size: res.data.size,
    //   max_guests: res.data.max_guests,
    //   num_bedrooms: res.data.num_bedrooms,
    //   num_bathrooms: res.data.num_bathrooms,
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
              // handleBodyContent={handleBodyContent}
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
}
