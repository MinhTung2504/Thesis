import { StatusCodes } from "http-status-codes";
import House from "../models/house";
import User from "../models/user";
import Booking from "../models/booking";
import Payment from "../models/payment";
import {
  comparePeriod,
  convertToArray,
  countStatistic,
  deduplicate,
  getDataByYear,
  getDataByYearNew,
  getYearArray,
  getYearArrayNew,
} from "../utils/statistic";

export const hostCountCompletedBookingsByYear = async (req, res) => {
  try {
    const hostHouses = await House.find({ host: req.user._id });
    const arrayHostHouse = [];
    hostHouses.map((h) => arrayHostHouse.push(h._id));
    const completedBookings = await Booking.find({
      house: arrayHostHouse.map((h) => h),
      status: "completed",
    });

    const data = countStatistic(completedBookings);

    const dataArray = convertToArray(data);

    const dataByYear = getDataByYear(dataArray, req.query.year).sort(
      comparePeriod
    );

    const yearArray = deduplicate(getYearArray(dataArray));
    res
      .status(StatusCodes.OK)
      .json(Object.assign({ data: dataByYear }, { yearArray }));
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Not Found",
    });
  }
};

function getTotalPriceByMonth(data) {
  const temp = {};
  // You can use for..of, if you want
  data.forEach(({ payment, createdAt }) => {
    const [year, month] = createdAt.split("-");
    const groupKey = month + "-" + year.replace('"', "");
    if (groupKey in temp) {
      temp[groupKey].totalPrice += payment;
    } else {
      temp[groupKey] = { month, totalPrice: payment };
    }
  });

  return Object.values(temp);
}

export const hostCountRevenuesByYear = async (req, res) => {
  try {
    const hostHouses = await House.find({ host: req.user._id });
    const arrayHostHouse = [];
    hostHouses.map((h) => arrayHostHouse.push(h._id));

    const result = await Booking.aggregate([
      {
        $match: {
          $and: [{ house: { $in: arrayHostHouse } }, { status: "completed" }],
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },

          total: { $sum: { $toInt: "$payment" } },
        },
      },
    ]);

    const dataByYear = getDataByYearNew(result, req.query.year).sort(
      comparePeriod
    );

    const yearArray = deduplicate(getYearArrayNew(result));
    res
      .status(StatusCodes.OK)
      .json(Object.assign({ data: dataByYear }, { yearArray }));
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Not Found",
    });
  }
};

export const countHouseFollowingCities = async (req, res) => {
  const result = await House.aggregate([
    {
      $group: {
        _id: "$city",
        count: { $sum: 1 },
      },
    },
  ]);

  res.json(result);
};

export const countAllFeaturesByHost = async (req, res) => {
  const totalHouse = await House.aggregate([
    { $match: { host: req.user._id } },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);

  const hostHouses = await House.find({ host: req.user._id });
  const arrayHostHouse = [];
  hostHouses.map((h) => arrayHostHouse.push(h._id));
  const completedBookings = await Booking.find({
    house: arrayHostHouse.map((h) => h),
    status: "completed",
  }).count();

  // const paidBookings = await Booking.find({
  //     house: arrayHostHouse.map((h) => h),
  //     status: "paid",
  // }).count();

  const startOfCurrentMonth = new Date();
  startOfCurrentMonth.setDate(1);

  const startOfNextMonth = new Date();
  startOfNextMonth.setDate(1);
  startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

  const bookings = await Booking.find({
    $and: [
      {
        createdAt: {
          $gte: startOfCurrentMonth,
          $lt: startOfNextMonth,
        },
      },
      {
        house: arrayHostHouse.map((h) => h),
      },
      { status: "completed" },
    ],
  });

  const paidBookings = await Booking.find({
    $and: [
      {
        createdAt: {
          $gte: startOfCurrentMonth,
          $lt: startOfNextMonth,
        },
      },
      {
        house: arrayHostHouse.map((h) => h),
      },
      { status: "paid" },
    ],
  }).count();

  const arrayRevenue = [];

  bookings.map((b) => arrayRevenue.push(parseInt(b.payment)));

  const totalRevenue = arrayRevenue.reduce((acc, a) => acc + a, 0);

  res.json(
    Object.assign(
      { completedBookings },
      { paidBookings },
      { totalHouse },
      { totalRevenue }
    )
  );
};
