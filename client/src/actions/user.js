import axios from "axios";

export const getUsers = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// export const createNewBooking = async (token, data) =>
//   await axios.post(`${process.env.REACT_APP_API}/booking/new`, data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });
