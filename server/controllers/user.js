import User from "../models/user";
import { StatusCodes } from "http-status-codes";

export const getUser = async (req, res) => {
  let user = await User.findById(req.params.userId);

  console.log(user);
  res.json(user);
};

export const getAllUsers = async (req, res) => {
  let allUsers = await User.find({}, { password: 0 });
  res.json(allUsers);
  //   const filters = req.query;
  //   let allUsers = await User.find({}, { password: 0 });
  //   const filteredUsers = allUsers.filter((user) => {
  //     let isValid = true;
  //     for (let key in filters) {
  //       console.log(key, user[key], filters[key]);
  //       isValid = isValid && user[key] == filters[key];
  //     }
  //     return isValid;
  //   });
  //   res.json(filteredUsers);
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

export const banUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.userId, {
    isBanned: "true",
  });

  res.status(StatusCodes.OK).json({
    status: "Success",
    message: "Ban User Successfully!",
  });
};

export const unbanUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.userId, {
    isBanned: "false",
  });

  res.status(StatusCodes.OK).json({
    status: "Success",
    message: "Unban User Successfully!",
  });
};

function count(array) {
  return array.reduce((total, elem) => {
    let temp = JSON.stringify(elem.createdAt).split("-");
    // let temp = JSON.parse(elem.createdAt);
    console.log(elem.createdAt.getFullYear());
    console.log(elem.createdAt.getMonth());
    // console.log(temp);
    // let tempp = temp.split("-");
    // console.log(tempp);
    // console.log(temp[0]);
    // console.log(temp[1]);
    [year, month] = temp;

    let groupKey = temp[0].replace('"', "") + "-" + temp[1];
    console.log(groupKey);

    total[groupKey] ? (total[groupKey] += 1) : (total[groupKey] = 1);
    // total[groupKey] += 1;
    console.log(total[groupKey]);
    return total;
  }, {});
}
export const getUserByMonth = async (req, res) => {
  const users = await User.find({});
  console.log(JSON.stringify(users));
  console.log(typeof users);

  const data = count(users);

  res.json(data);
};
