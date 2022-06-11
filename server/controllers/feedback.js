import { StatusCodes } from "http-status-codes";
import booking from "../models/booking";
import Feedback from "../models/feedback";

export const createFeedback = async (req, res) => {
    try {
        let feedback = new Feedback({
            star: req.body.star,
            user: req.user._id,
            content: req.body.content,
            booking: req.body.booking
        });
        await feedback.save();

        await booking.findByIdAndUpdate(req.body.booking, { isFeedback: true })
        // console.log(JSON.stringify(booking._id));
        // const resBooking = await Booking.findById(booking._id).populate({
        //     path: "house",
        //     populate: { path: "host", select: "email -_id" },
        //     select: "host title -_id",
        // });
        // console.log(resBooking);
        res.json(feedback);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST);
        res.json({
            error: error.message,
        });
    }
};

export const getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findOne({ booking: req.params.bookingId })
        // await feedback.save();

        // await booking.findByIdAndUpdate(req.body.booking, { isFeedback: true })
        // console.log(JSON.stringify(booking._id));
        // const resBooking = await Booking.findById(booking._id).populate({
        //     path: "house",
        //     populate: { path: "host", select: "email -_id" },
        //     select: "host title -_id",
        // });
        // console.log(resBooking);
        res.json(feedback);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST);
        res.json({
            error: error.message,
        });
    }
};