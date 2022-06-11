import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const feedbackSchema = new Schema(
    {
        star: {
            type: Number,
            required: true
        },
        content: {
            type: String,
        },
        booking: {
            type: ObjectId,
            ref: "Booking",
        },
        user: {
            type: ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);