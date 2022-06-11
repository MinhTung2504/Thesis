import axios from "axios";

export const getAllHouses = async (page, city, sort, numGuests, priceRange, numBedrooms, numBathrooms) =>
  await axios.get(
    `${process.env.REACT_APP_API}/houses?page=${page}&${city}&${sort}&${numGuests}&${priceRange}&${numBedrooms}&${numBathrooms}`
  );

export const getSimilarHouses = async (houseId) =>
  await axios.get(
    `${process.env.REACT_APP_API}/houses/similar/${houseId}`
  );


export const getAllHousesByAdmin = async (token, page) =>
  await axios.get(`${process.env.REACT_APP_API}/admin/houses?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getHouseById = async (houseId) =>
  await axios.get(`${process.env.REACT_APP_API}/house/${houseId}`);

export const getHostHouses = async (token, page) =>
  await axios.get(`${process.env.REACT_APP_API}/host/houses?page=${page}`, {
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

export const blockHouse = async (token, data, houseId) => {
  await axios.put(`${process.env.REACT_APP_API}/house/block/${houseId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const unlockHouse = async (token, data, houseId) => {
  await axios.put(
    `${process.env.REACT_APP_API}/house/unlock/${houseId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
