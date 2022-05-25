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

export const getBookingOfHostHouses = async (token, page) =>
  await axios.get(`${process.env.REACT_APP_API}/host/bookings?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const acceptBooking = async (token, bookingId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/host/bookings/${bookingId}/accepted`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const rejectBooking = async (token, bookingId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/host/bookings/${bookingId}/rejected`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
