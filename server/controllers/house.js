import { StatusCodes } from "http-status-codes";
import House from "../models/house";
import NodeCache from "node-cache";
import {
  WIDTH_IMAGE,
  HEIGHT_IMAGE,
  PAGE_LIST,
  PAGESIZE_LIST,
  GREATER_THAN_PRICE,
  GREATER_THAN_MAX_GUESTS,
  GREATER_THAN_SIZE,
} from "../utils/constants";
import FilteringFeature from "../utils/filterFeature";
import Destination from "../models/destination";
const cloudinary = require("../utils/cloudinary");

const myCache = new NodeCache({ stdTTL: 3600 });

const getCitiesArray = async (req, res) => {
  const des = await Destination.find({});
  const arrayCities = [];

  des.map((d) => arrayCities.push(d.city));

  return arrayCities;
};

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
    const cities = await getCitiesArray();
    if (cities.includes(req.body.city) === false) {
      let des = new Destination({
        city: req.body.city,
      });
      await des.save();
    }
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

export const getAllHousesByAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || PAGE_LIST;
    const pageSize = parseInt(req.query.limit) || PAGESIZE_LIST;
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
    const result = await House.find()
      .populate("host", "name -_id")
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

export const getAllHouses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || PAGE_LIST;
    const pageSize = parseInt(req.query.limit) || PAGESIZE_LIST;
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
    const features = new FilteringFeature(
      House.find({ isBlocked: false }),
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
    const page = parseInt(req.query.page) || PAGE_LIST;
    const pageSize = parseInt(req.query.limit) || PAGESIZE_LIST;
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

    const cities = await getCitiesArray();
    if (cities.includes(data.city) === false) {
      let des = new Destination({
        city: data.city,
      });
      await des.save();
    }
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

export const blockHouse = async (req, res) => {
  try {
    await House.findByIdAndUpdate(req.params.houseId, {
      isBlocked: req.body.isBlocked,
    });

    res
      .status(StatusCodes.OK)
      .json({ status: "success", message: " Block House Successfully!" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
};

export const unlockHouse = async (req, res) => {
  try {
    await House.findByIdAndUpdate(req.params.houseId, {
      isBlocked: req.body.isBlocked,
    });

    res
      .status(StatusCodes.OK)
      .json({ status: "success", message: " Unlock House Successfully!" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
};

export const getSimilarHouses = async (req, res) => {
  try {
    const h = await House.findById(req.params.houseId);
    const result = await House.find({
      isBlocked: false,
      city: h.city,
      price: {
        $gte: h.price - GREATER_THAN_PRICE,
        $lte: h.price + GREATER_THAN_PRICE,
      },
      max_guests: {
        $gte: h.max_guests - GREATER_THAN_MAX_GUESTS,
        $lte: h.max_guests + GREATER_THAN_MAX_GUESTS,
      },
      size: {
        $gte: h.size - GREATER_THAN_SIZE,
        $lte: h.size + GREATER_THAN_SIZE,
      },
    }).limit(PAGESIZE_LIST);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
};
