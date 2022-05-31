import { StatusCodes } from "http-status-codes";
import House from "../models/house";
import NodeCache from "node-cache";
import {
  WIDTH_IMAGE,
  HEIGHT_IMAGE,
  PAGE_LIST_HOUSE,
  PAGESIZE_LIST_HOUSE,
} from "../utils/constants";
import FilteringHouses from "../utils/filterHouse";
const cloudinary = require("../utils/cloudinary");

const myCache = new NodeCache({ stdTTL: 3600 });
export const createHouse = async (req, res) => {
  try {
    const imageUrls = [];
    const images = req.files;
    let multipleImagePromise = images.map((image) =>
      cloudinary.uploader.upload(image.path, {
        width: WIDTH_IMAGE,
        height: HEIGHT_IMAGE,
      })
    );
    let imageResponses = await Promise.all(multipleImagePromise);

    // console.log(imageResponses);
    imageResponses.map((imageUrl) => imageUrls.push(imageUrl.url));
    // console.log(imageUrls);

    let house = new House({
      title: req.body.title,
      content: req.body.content,
      city: req.body.city,
      country: req.body.country,
      address: req.body.address,
      phone: req.body.phone,
      price: req.body.price,
      num_beds: req.body.num_beds,
      num_bedrooms: req.body.num_bedrooms,
      num_bathrooms: req.body.num_bathrooms,
      max_guests: req.body.max_guests,
      size: req.body.size,
      image: imageUrls[0],
      images: imageUrls,
      host: req.user._id,
    });
    await house.save();
    res.json(house);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
};

export const getAllHouseTest = async (req, res) => {
  try {
    const features = new APIfeatures(House.find(), req.query)
      .filtering()
      .sorting()
      .paginating();

    const houses = await features.query;

    res.json({
      status: "Success",
      result: houses.length,
      data: houses,
    });
  } catch (error) {}
  return res.status(500).json({ msg: error.message });
};

export const getAllHouses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || PAGE_LIST_HOUSE;
    const pageSize = parseInt(req.query.limit) || PAGESIZE_LIST_HOUSE;
    const skip = (page - 1) * pageSize;
    if (myCache.has("totalHouses")) {
      var total;
      total = myCache.get("totalHouses");
    } else {
      total = await House.countDocuments();
      myCache.set("totalHouses", total);
    }
    const pages = Math.ceil(total / pageSize);
    if (page > pages) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: "Fail",
        message: "No Page Found",
      });
    }
    // const result = await House.find().skip(skip).limit(pageSize);
    const features = new FilteringHouses(House.find(), req.query)
      .filtering()
      .sorting()
      .paginating();

    const result = await features.query;

    // const result = await House.find()
    //   .populate("user", "name -_id")
    //   .skip(skip)
    //   .limit(pageSize);
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

export const getHouseById = async (req, res) => {
  try {
    let house = await House.findById(req.params.houseId).exec();
    console.log(house);
    res.json(house);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "House Not Found",
    });
  }
};

export const deleteHouse = async (req, res) => {
  try {
    let deleted = await House.deleteById(req.params.houseId).exec();
    res.json(deleted);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "House Not Found To Delete",
    });
  }
};

export const getHostHouses = async (req, res) => {
  // let hostHouses = await House.find({ host: req.user._id })
  // .select("-image.data")
  // .populate("host", "_id name")
  // .count();
  // .exec();
  // res.json(hostHouses);
  try {
    const page = parseInt(req.query.page) || PAGE_LIST_HOUSE;
    const pageSize = parseInt(req.query.limit) || PAGESIZE_LIST_HOUSE;
    // const pageSize = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * pageSize;
    if (myCache.has("totalHostHouse")) {
      var total;
      total = myCache.get("totalHostHouse");
    } else {
      total = await House.find({ host: req.user._id }).count();
      myCache.set("totalHostHouse", total);
    }
    const pages = Math.ceil(total / pageSize);
    if (page > pages) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: "Fail",
        message: "No Page Found",
      });
    }
    const result = await House.find({ host: req.user._id })
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

export const updateHouse = async (req, res) => {
  try {
    let data = req.body;

    // console.log(data);
    // console.log(req.params.houseId);

    let updated = await House.findByIdAndUpdate(req.params.houseId, data, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("House update failed. Try again!");
  }
};
