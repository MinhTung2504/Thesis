import express from "express";
import { getPaymentByBookingId } from "../controllers/payment";
import { auth, authPage } from "../middlewares";

const router = express.Router();

router.get("/payment/:bookingId", auth, getPaymentByBookingId);

// export default router;
module.exports = router;
