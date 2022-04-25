import { StatusCodes } from "http-status-codes";
import House from "../models/house";

export const createHouse = async (req, res) => {
  //   try {
  //     const house = new House(req.body);
  //     // house.host = req.session._id;
  //     house.save((err, result) => {
  //       if (err) {
  //         console.log("Save err", err);
  //         res.status(StatusCodes.BAD_REQUEST).send("Error Saving");
  //       }
  //       res.json(result);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(StatusCodes.BAD_REQUEST).j;
  //     son({
  //       error: error.message,
  //     });
  //   }
};

export const getAllHouses = async (req, res) => {
  let allHouses = await House.find({}).limit(24).exec();
  console.log(allHouses);
  res.json(allHouses);
};
