import axios from "axios";

export const getPayment = async (bookingId, token) =>
  await axios.get(`${process.env.REACT_APP_API}/payment/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
