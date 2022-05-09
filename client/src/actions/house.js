import axios from "axios";

export const getAllHouses = async (page) =>
  await axios.get(`${process.env.REACT_APP_API}/houses?page=${page}`);

export const getHouseById = async (houseId) =>
  await axios.get(`${process.env.REACT_APP_API}/house/${houseId}`);

export const createNewHouse = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API}/house/new`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
