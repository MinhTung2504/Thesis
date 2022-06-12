import axios from "axios";

export const getUserStatistic = async (token, year) =>
    await axios.get(`${process.env.REACT_APP_API}/get-user-statistic?year=${year}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const getHouseStatistic = async (token, year) =>
    await axios.get(`${process.env.REACT_APP_API}/get-house-statistic?year=${year}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const getHouseByCities = async (token) =>
    await axios.get(`${process.env.REACT_APP_API}/count-house-by-city`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const getAllFeatureByAdmin = async (token) =>
    await axios.get(`${process.env.REACT_APP_API}/count-all-features`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
