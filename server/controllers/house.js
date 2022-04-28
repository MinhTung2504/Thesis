import { StatusCodes } from "http-status-codes";
import House from "../models/house";
import NodeCache from "node-cache";

const myCache = new NodeCache({ stdTTL: 3600 });
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
  // let allHouses = await House.find({}).limit(24).exec();
  // console.log(allHouses);
  // res.json(allHouses);

  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * pageSize;
    if (myCache.has("totalPages")) {
      const pages = myCache.get("totalPages");
      const result = await House.find().skip(skip).limit(pageSize);
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
    } else {
      const total = await House.countDocuments();
      const pages = Math.ceil(total / pageSize);
      myCache.set("totalPages", pages);
      const result = await House.find().skip(skip).limit(pageSize);
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
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Server Error",
    });
  }
};

export const getHouseById = async (req, res) => {
  let house = await House.findById(req.params.houseId).exec();
  console.log(house);
  res.json(house);
};
