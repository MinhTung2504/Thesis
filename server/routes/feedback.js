import express from "express";
import { createFeedback, getFeedbackById } from "../controllers/feedback";
import { auth } from "../middlewares";

const router = express.Router();

router.post("/feedback/create", auth, createFeedback);
router.get("/feedback/:bookingId", auth, getFeedbackById);

// export default router;
module.exports = router;
