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
  // const PAGE_SIZE = 9;
  // const page = parseInt(req.query.page || "0");
  // const total = await House.countDocuments({});
  // const allHouses = await House.find({})
  //   .limit(PAGE_SIZE)
  //   .skip(PAGE_SIZE * page);

  // res.json({ totalPages: Math.ceil(total / PAGE_SIZE), allHouses });
};

export const getHouseById = async (req, res) => {
  let house = await House.findById(req.params.houseId).exec();
  console.log(house);
  res.json(house);
};
