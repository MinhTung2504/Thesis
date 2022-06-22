import User from "../models/user";
import { StatusCodes } from "http-status-codes";
import NodeCache from "node-cache";
import { PAGESIZE_LIST, PAGE_LIST } from "../utils/constants";
import FilteringFeature from "../utils/filterFeature";

const myCache = new NodeCache({ stdTTL: 3600 });
export const getUser = async (req, res) => {
  let user = await User.findById(req.params.userId);

  console.log(user);
  res.json(user);
};

export const getAllUsers = async (req, res) => {
  // let allUsers = await User.find({}, { password: 0 });
  // res.json(allUsers);

  try {
    const page = parseInt(req.query.page) || PAGE_LIST;
    const pageSize = parseInt(req.query.limit) || PAGESIZE_LIST;
    const skip = (page - 1) * pageSize;
    if (myCache.has("totalUsers")) {
      var total;
      total = myCache.get("totalUsers");
    } else {
      total = await User.countDocuments();
      myCache.set("totalUsers", total);
    }
    const pages = Math.ceil(total / pageSize);
    if (page > pages) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: "Fail",
        message: "No Page Found",
      });
    }
    // const result = await House.find().skip(skip).limit(pageSize);
    const features = new FilteringFeature(User.find({}), req.query)
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

export const getAllBannedUsers = async (req, res) => {
  let allBannedUsers = await User.find({ isBanned: true }, { password: 0 });

  res.json(allBannedUsers);
};

export const editRoleUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.userId, {
    role: "host",
  });

  res.status(StatusCodes.OK).json({
    status: "Success",
    message: "Change Role User to Host Successfully!",
  });
};

// export const banUser = async (req, res) => {
//   await User.findByIdAndUpdate(req.params.userId, {
//     isBanned: "true",
//   });

//   res.status(StatusCodes.OK).json({
//     status: "Success",
//     message: "Ban User Successfully!",
//   });
// };

// export const unbanUser = async (req, res) => {
//   await User.findByIdAndUpdate(req.params.userId, {
//     isBanned: "false",
//   });

//   res.status(StatusCodes.OK).json({
//     status: "Success",
//     message: "Unban User Successfully!",
//   });
// };

export const banUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.userId, {
      isBanned: req.body.isBanned,
    });

    res
      .status(StatusCodes.OK)
      .json({ status: "success", message: " Ban User Successfully!" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
};

export const unbanUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.userId, {
      isBanned: req.body.isBanned,
    });

    res
      .status(StatusCodes.OK)
      .json({ status: "success", message: " Unban User Successfully!" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
};

export const getProfileUser = async (req, res) => {
  try {
    const profile = await User.findById(req.user._id);
    res.status(StatusCodes.OK).json(profile);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
};

export const editProfileUser = async (req, res) => {
  try {
    let data = req.body;
    console.log(req.body);
    let updated = await User.findByIdAndUpdate(req.user._id, data, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({
      error: error.message,
    });
  }
}
