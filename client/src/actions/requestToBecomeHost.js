import axios from "axios";

export const getUserRequests = async (token, page) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/user-requests?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const adminGetAllRequests = async (token, page) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/user/all-requests?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createRequest = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API}/user/request`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const acceptRequest = async (token, data, requestId) => {
  await axios.put(
    `${process.env.REACT_APP_API}/user/request/${requestId}/accepted`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const rejectRequest = async (token, data, requestId) => {
  await axios.put(
    `${process.env.REACT_APP_API}/user/request/${requestId}/rejected`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
