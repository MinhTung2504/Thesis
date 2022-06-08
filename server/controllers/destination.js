import { StatusCodes } from "http-status-codes";
import Destination from "../models/destination";

export const getAllDes = async (req, res) => {
  try {
    const allDes = await Destination.find({});
    res.json(allDes);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
};
