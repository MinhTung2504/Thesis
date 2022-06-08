import mongoose from "mongoose";

const { Schema } = mongoose;

const destinationSchema = new Schema(
  {
    city: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Destination", destinationSchema);
