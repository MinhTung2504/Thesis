import { expressjwt } from "express-jwt";
import User from "../models/user";
import jwt from "jsonwebtoken";
import House from "../models/house";

// req.user
export const requireSignin = expressjwt({
  // secret, expiryDate
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const data = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const user = await User.findOne({ _id: data._id, "tokens.token": token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};

export const housesOfHost = async (req, res, next) => {
  let house = await House.findById(req.params.houseId).exec();
  let hostHouse = house.host._id.toString() === req.user._id.toString();
  if (!hostHouse) {
    return res.status(403).send("Unauthorized");
  }
  next();
};
