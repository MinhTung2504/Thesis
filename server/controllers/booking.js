import { StatusCodes } from "http-status-codes";
import Booking from "../models/booking";
import NodeCache from "node-cache";
import { PAGESIZE_LIST_HOUSE, PAGE_LIST_HOUSE } from "../utils/constants";
import House from "../models/house";

const myCache = new NodeCache({ stdTTL: 3600 });
export const createBooking = async (req, res) => {
  try {
    let booking = new Booking({
      payment: req.body.payment,
      user: req.user._id,
      house: req.body.house,
      date_check_in: req.body.date_check_in,
      date_check_out: req.body.date_check_out,
    });
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
};

export const getUserBooking = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || PAGE_LIST_HOUSE;
    const pageSize = parseInt(req.query.limit) || PAGESIZE_LIST_HOUSE;
    // const pageSize = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * pageSize;
    if (myCache.has("totalUserBooking")) {
      var totalUserBooking;
      totalUserBooking = myCache.get("totalUserBooking");
    } else {
      totalUserBooking = await Booking.find({ user: req.user._id }).count();
      myCache.set("totalUserBooking", totalUserBooking);
    }
    const pages = Math.ceil(totalUserBooking / pageSize);
    if (page > pages) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: "Fail",
        message: "No Page Found",
      });
    }
    const result = await Booking.find({ user: req.user._id })
      .populate("house", "title image -_id")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);
    if (page > pages) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: "Fail",
        message: "No Page Found",
      });
    }
    res.status(StatusCodes.OK).json({
      status: "success",
      count: result.length,
      page,
      pages,
      data: result,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Server Error",
    });
  }
};

// export const acceptBooking = async (req, res) => {
//   try {
//     await Booking.findByIdAndUpdate(req.params.requestId, {
//       status: "accepted",
//     });

//     let userId = req.body.user;

//     // console.log(userId);
//     await User.findByIdAndUpdate(userId, { role: "host" });

//     res
//       .status(StatusCodes.OK)
//       .json({ status: "success", message: "Accepted Request" });
//   } catch (error) {
//     res.status(StatusCodes.BAD_REQUEST);
//     res.json({
//       error: error.message,
//     });
//   }
// };

// export const rejectBooking = async (req, res) => {
//   try {
//     await Booking.findByIdAndUpdate(req.params.requestId, {
//       status: "rejected",
//     });

//     res
//       .status(StatusCodes.OK)
//       .json({ status: "success", message: "Rejected Request" });
//   } catch (error) {
//     res.status(StatusCodes.BAD_REQUEST);
//     res.json({
//       error: error.message,
//     });
//   }
// };
