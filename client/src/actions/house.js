import axios from "axios";

export const getAllHouses = async (page) =>
  await axios.get(`${process.env.REACT_APP_API}/houses?page=${page}`);

export const getHouseById = async (houseId) =>
  await axios.get(`${process.env.REACT_APP_API}/house/${houseId}`);
