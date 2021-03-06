import axios from "axios";

export const getUsers = async (token, page) =>
  await axios.get(`${process.env.REACT_APP_API}/users?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const banUser = async (token, data, userId) => {
  await axios.put(`${process.env.REACT_APP_API}/users/${userId}/banned`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const unbanUser = async (token, data, userId) => {
  await axios.put(
    `${process.env.REACT_APP_API}/users/${userId}/unbanned`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getUserProfile = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/my-profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const editUserProfile = async (token, data) =>
  await axios.put(`${process.env.REACT_APP_API}/my-profile/edit`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
