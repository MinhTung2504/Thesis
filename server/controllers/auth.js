import User from "../models/user";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { PASSWORD_MIN_LENGTH, EXPIRESIN_TOKEN } from "../utils/constants";

export const register = async (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;

  // Validation
  if (!name)
    return res.status(StatusCodes.BAD_REQUEST).send("Name is required");
  if (!password || password.length < PASSWORD_MIN_LENGTH)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(
        `Password is required and should be min ${PASSWORD_MIN_LENGTH} characters long`
      );
  let userExist = await User.findOne({ email }).exec();
  if (userExist)
    return res.status(StatusCodes.BAD_REQUEST).send("Email is taken");

  // Register
  const user = new User(req.body);
  try {
    await user.save();
    // console.log("USER CREATED", user);
    return res.json({ ok: true });
  } catch (error) {
    // console.log("CREATE USER FAILED", err);
    return res.status(StatusCodes.BAD_REQUEST).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    // check if user with that email exist
    let user = await User.findOne({ email }).exec();
    // console.log("USER EXIST", user);
    if (user.isBanned === true)
      return res.status(StatusCodes.BAD_REQUEST).send("User is Banned");
    if (!user)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("User or Password is Incorrect");
    // compare password
    user.comparePassword(password, (err, match) => {
      // console.log("COMPARE PASSWORD IN LOGIN ERR ", err);
      if (!match || err)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send("User or Password is Incorrect");
      // GENERATE A TOKEN THEN SEND AS RESPONSE TO CLIENT
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: EXPIRESIN_TOKEN,
      });
      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          role: user.role,
          isBanned: user.isBanned,
        },
      });
    });
  } catch (error) {
    // console.log("LOGIN ERROR", err);
    res.status(StatusCodes.BAD_REQUEST).send("Signin failed");
  }
};
