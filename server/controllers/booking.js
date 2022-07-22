import { StatusCodes } from "http-status-codes";
import Booking from "../models/booking";
import NodeCache from "node-cache";
import House from "../models/house";
import FilteringFeature from "../utils/filterFeature";
import { PAGESIZE_LIST, PAGE_LIST } from "../utils/constants";

const myCache = new NodeCache({ stdTTL: 360 });
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
    // console.log(JSON.stringify(booking._id));
    const resBooking = await Booking.findById(booking._id).populate({
      path: "house",
      populate: { path: "host", select: "email -_id" },
      select: "host title -_id",
    });
    // console.log(resBooking);
    res.json(resBooking);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
};

export const getUserBooking = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || PAGE_LIST;
    const pageSize = parseInt(req.query.limit) || PAGESIZE_LIST;
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
    // const result = await Booking.find({
    //   user: req.user._id,
    // })
    //   .populate("house", "title image -_id")
    //   .sort({ createdAt: -1 })
    //   .skip(skip)
    //   .limit(pageSize);

    const features = new FilteringFeature(
      Booking.find({ user: req.user._id })
        .populate({
          path: "house",
          populate: { path: "host", select: "email -_id" },
          select: "host image title",
        })
        .populate("user", "name -_id")
        .sort({ createdAt: -1 }),
      req.query
    )
      .filtering()
      .sorting()
      .paginating();

    const result = await features.query;

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

export const getBookingsOfHostHouses = async (req, res) => {
  try {
    const hostHouses = await House.find({ host: req.user._id });
    const arrayHostHouse = [];
    hostHouses.map((h) => arrayHostHouse.push(h._id));
    const page = parseInt(req.query.page) || PAGE_LIST;
    const pageSize = parseInt(req.query.limit) || PAGESIZE_LIST;
    // const pageSize = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * pageSize;
    if (myCache.has("bookingsofHostHouses")) {
      var bookingsofHostHouses;
      bookingsofHostHouses = myCache.get("bookingsofHostHouses");
    } else {
      bookingsofHostHouses = await Booking.find({
        house: arrayHostHouse.map((h) => h),
      }).count();
      myCache.set("bookingsofHostHouses", bookingsofHostHouses);
    }
    const pages = Math.ceil(bookingsofHostHouses / pageSize);
    if (page > pages) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: "Fail",
        message: "No Page Found",
      });
    }
    const result = await Booking.find({
      house: arrayHostHouse.map((h) => h),
    })
      .populate("user", "name email -_id")
      .populate("house", "title price -_id")
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

export const acceptBooking = async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.bookingId, {
      status: req.body.status,
    });

    res
      .status(StatusCodes.OK)
      .json({ status: "success", message: "Accepted Booking" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
};

export const rejectBooking = async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.bookingId, {
      status: req.body.status,
    });

    res
      .status(StatusCodes.OK)
      .json({ status: "success", message: "Rejected Request" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
};

export const checkoutBooking = async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.bookingId, {
      status: req.body.status,
    });

    res
      .status(StatusCodes.OK)
      .json({ status: "success", message: "Checkout Request" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
};

export const checkPaidBooking = async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.bookingId, {
      status: "paid",
    });

    res
      .status(StatusCodes.OK)
      .json({ status: "success", message: "Booking is paid" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.bookingId, {
      status: req.body.status,
    });

    res
      .status(StatusCodes.OK)
      .json({ status: "success", message: "Cancel Successfully" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
};
