import axios from "axios";

export const sendEmail = async (token, data) =>
  await axios.post(`http://localhost:8000/api/send-email`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
