import mongoose from "mongoose";
import { REG_EXP_PHONE } from "../utils/constants";
import mongoose_delete from "mongoose-delete";

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
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
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
    num_beds: {
      type: Number,
      required: true,
    },
    num_bedrooms: {
      type: Number,
      required: true,
    },
    num_bathrooms: {
      type: Number,
      required: true,
    },
    max_guests: {
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

houseSchema.plugin(mongoose_delete, { overrideMethods: "all" });

export default mongoose.model("House", houseSchema);
