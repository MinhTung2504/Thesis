import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const paymentSchema = new Schema(
  {
    payment_method: {
      type: String,
    },
    status: {
      type: String,
    },
    name_payment: {
      type: String,
    },
    total: {
      type: String,
    },
    house: {
      type: ObjectId,
      ref: "House",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
