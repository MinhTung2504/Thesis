import axios from "axios";

export const getAllHouses = async () =>
  await axios.get(`${process.env.REACT_APP_API}/houses`);

export const getHouseById = async (houseId) =>
  await axios.get(`${process.env.REACT_APP_API}/house/${houseId}`);
