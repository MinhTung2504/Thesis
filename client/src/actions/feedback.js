import axios from "axios";

export const createFeedback = async (token, data) =>
    await axios.post(`${process.env.REACT_APP_API}/feedback/create`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

export const getFeedbackById = async (token, bookingId) =>
    await axios.get(`${process.env.REACT_APP_API}/feedback/${bookingId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
