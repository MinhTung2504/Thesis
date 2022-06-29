import axios from "axios";

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
      },
    }
  );
};

export const getUserRequests = async (token) => {
  const res = await axios.get(`${process.env.REACT_APP_API}/user-requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const adminGetAllRequests = async (token) => {
  await axios.get(`${process.env.REACT_APP_API}/user/all-requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
