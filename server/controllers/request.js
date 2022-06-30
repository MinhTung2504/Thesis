import { StatusCodes } from "http-status-codes";
import NodeCache from "node-cache";
import Request from "../models/request";
import User from "../models/user";
import { PAGESIZE_LIST, PAGE_LIST } from "../utils/constants";

const myCache = new NodeCache({ stdTTL: 3600 });
export const createRequest = async (req, res) => {
  try {
    let request = new Request({
      content: req.body.content,
      user: req.user._id,
    });
    await request.save();
    res.json(request);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    await Request.findByIdAndUpdate(req.params.requestId, {
      status: "accepted",
    });

    let userId = req.body.user;

    await User.findByIdAndUpdate(userId, { role: "host" });

    res
      .status(StatusCodes.OK)
      .json({ status: "success", message: "Accepted Request" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    await Request.findByIdAndUpdate(req.params.requestId, {
      status: "rejected",
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

export const allRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || PAGE_LIST;
    const pageSize = parseInt(req.query.limit) || PAGESIZE_LIST;
    const skip = (page - 1) * pageSize;
    if (myCache.has("totalRequests")) {
      var totalRequests;
      totalRequests = myCache.get("totalRequests");
    } else {
      totalRequests = await Request.find({}).count();
      myCache.set("totalRequests", totalRequests);
    }
    const pages = Math.ceil(totalRequests / pageSize);
    if (page > pages) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: "Fail",
        message: "No Page Found",
      });
    }
    const result = await Request.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    // const result = await

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

export const getUserRequest = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || PAGE_LIST;
    const pageSize = parseInt(req.query.limit) || PAGESIZE_LIST;
    const skip = (page - 1) * pageSize;
    if (myCache.has("totalRequests")) {
      var totalRequests;
      totalRequests = myCache.get("totalRequests");
    } else {
      totalRequests = await Request.find({ user: req.user._id }).count();
      myCache.set("totalRequests", totalRequests);
    }
    const pages = Math.ceil(totalRequests / pageSize);
    if (page > pages) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: "Fail",
        message: "No Page Found",
      });
    }
    const result = await Request.find({ user: req.user._id })
      .populate("user", "name email -_id")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    // const result = await

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
