import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const bookingSchema = new Schema(
  {
    payment: {
      type: Number,
      required: "Payment is required",
    },
    status: {
      type: String,
      enum: [
        "pending",
        "not-paid",
        "paid",
        "in-progress",
        "completed",
        "canceled",
      ],
      default: "pending",
    },
    date_check_in: {
      type: Date,
    },
    date_check_out: {
      type: Date,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    house: {
      type: ObjectId,
      ref: "House",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
