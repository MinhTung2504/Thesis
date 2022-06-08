import axios from "axios";

export const getAllDestinations = async () =>
  await axios.get(`${process.env.REACT_APP_API}/destinations`);
