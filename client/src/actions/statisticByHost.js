import axios from "axios";

export const countCompletedBookingYearByHost = async (token, year) =>
    await axios.get(
        `${process.env.REACT_APP_API}/host/count-completed-booking-year?year=${year}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

export const countRevenueYearByHost = async (token, year) =>
    await axios.get(
        `${process.env.REACT_APP_API}/host/count-revenue-year?year=${year}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

export const getAllFeatureByHost = async (token) =>
    await axios.get(`${process.env.REACT_APP_API}/host/count-all-features`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
