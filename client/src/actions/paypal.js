import axios from "axios";

export const payBooking = async (bookingId, data) =>
  await axios.post(`${process.env.REACT_APP_API}/pay/${bookingId}`, data);
