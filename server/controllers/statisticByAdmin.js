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
    getYearArray,
} from "../utils/statistic";

export const getUserDataByYear = async (req, res) => {
    try {
        const users = await User.find({});

        const data = countStatistic(users);

        const dataArray = convertToArray(data);

        const dataByYear = getDataByYear(
            dataArray.sort(comparePeriod),
            req.query.year
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

export const getHouseDataByYear = async (req, res) => {
    try {
        const users = await House.find({});

        const data = countStatistic(users);

        const dataArray = convertToArray(data);

        const dataByYear = getDataByYear(
            dataArray.sort(comparePeriod),
            req.query.year
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

export const countAllSystemFeatures = async (req, res) => {
    const totalUser = await User.aggregate([
        {
            $group: {
                _id: null,
                count: { $sum: 1 },
            },
        },
    ]);
    const totalHouse = await House.aggregate([
        {
            $group: {
                _id: null,
                count: { $sum: 1 },
            },
        },
    ]);
    const totalHost = await User.aggregate([
        { $match: { role: "host" } },
        {
            $group: {
                _id: "$role",
                count: { $sum: 1 },
            },
        },
    ]);

    const totalCompletedBooking = await Booking.aggregate([
        { $match: { status: "completed" } },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 },
            },
        },
    ]);

    const startOfCurrentMonth = new Date();
    startOfCurrentMonth.setDate(1);

    const startOfNextMonth = new Date();
    startOfNextMonth.setDate(1);
    startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

    const pay = await Payment.find({
        $and: [
            {
                createdAt: {
                    $gte: startOfCurrentMonth,
                    $lt: startOfNextMonth,
                },
            },
        ],
    });

    const arrayPayment = [];

    pay.map((p) => arrayPayment.push(parseInt(p.total)));

    const sumMoneySendHost = arrayPayment.reduce((acc, a) => acc + a, 0) * 23000;

    res.json(
        Object.assign(
            { totalHost },
            { totalCompletedBooking },
            { totalUser },
            { totalHouse },
            { sumMoneySendHost }
        )
    );
};
