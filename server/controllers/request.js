import { StatusCodes } from "http-status-codes";
import Request from "../models/request";
import User from "../models/user";

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

    // console.log(userId);
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
