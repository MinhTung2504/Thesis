import axios from "axios";

export const getUserBooking = async (token, page) =>
  await axios.get(`${process.env.REACT_APP_API}/user/booking?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createNewBooking = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API}/booking/new`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
