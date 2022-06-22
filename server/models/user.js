import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { REG_EXP_EMAIL, SALT_HASH } from "../utils/constants";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      max: 50,
    },
    email: {
      type: String,
      trim: true,
      required: "Email is required",
      unique: true,
      match: [REG_EXP_EMAIL, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    birthday: {
      type: Date,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "host", "admin"],
      default: "user",
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    return bcrypt.hash(user.password, SALT_HASH, (err, hash) => {
      if (err) {
        console.log("BCRYPT HASH ERR ", err);
        return next(err);
      }
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, (err, match) => {
    if (err) {
      console.log("COMPARE PASSWORD ERR", err);
      return next(err, false);
    }
    // If no err, we get null
    console.log("MATCH PASSWORD", match);
    return next(null, match); // true
  });
};

export default mongoose.model("User", userSchema);
