import Payment from "../models/payment";
import { StatusCodes } from "http-status-codes";

export const getPaymentByBookingId = async (req, res) => {
  try {
    let payment = await Payment.findOne({
      bookingId: req.params.bookingId,
    }).exec();
    console.log(payment);
    res.json(payment);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Payment Not Found",
    });
  }
};
