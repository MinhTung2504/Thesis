import axios from "axios";

export const sendEmail = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API}/send-email`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
