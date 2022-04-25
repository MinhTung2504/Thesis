import mongoose from "mongoose";
import { REG_EXP_PHONE } from "../utils/constants";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const houseSchema = new Schema(
  {
    title: {
      type: String,
      required: "Title is required",
    },
    content: {
      type: String,
      required: "Content is required",
      maxlength: 500,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: [REG_EXP_PHONE, "Please fill a valid phone number"],
    },
    price: {
      type: Number,
      required: "Price is required",
      trim: true,
    },
    host: {
      type: ObjectId,
      ref: "User",
    },
    image: {
      type: String,
      default: "",
    },
    images: [],
    bed: {
      type: Number,
      required: true,
    },
    max_guest: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["listed", "unlisted"],
      default: "listed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("House", houseSchema);
