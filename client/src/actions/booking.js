import axios from "axios";

export const getUserBooking = async (token, page, status) =>
  await axios.get(
    `${process.env.REACT_APP_API}/user/booking?page=${page}&${status}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

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

export const acceptBooking = async (token, data, bookingId) => {
  // console.log(token);
  await axios.put(
    `${process.env.REACT_APP_API}/host/bookings/accept/${bookingId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const rejectBooking = async (token, data, bookingId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/host/bookings/reject/${bookingId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const checkoutBooking = async (token, data, bookingId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/host/bookings/checkout-success/${bookingId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const checkPaidBooking = async (token, data, bookingId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/host/bookings/paid-success/${bookingId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const cancelBooking = async (token, data, bookingId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/bookings/cancel/${bookingId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
