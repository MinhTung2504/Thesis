import axios from "axios";

export const getAllHouses = async (page) =>
  await axios.get(`${process.env.REACT_APP_API}/houses?page=${page}`);

export const getHouseById = async (houseId) =>
  await axios.get(`${process.env.REACT_APP_API}/house/${houseId}`);

export const getHostHouses = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/host/houses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createNewHouse = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API}/house/new`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

export const updateHouse = async (token, data, houseId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/house/update/${houseId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

export const deleteHouse = async (token, hotelId) =>
  await axios.delete(`${process.env.REACT_APP_API}/house/delete/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
