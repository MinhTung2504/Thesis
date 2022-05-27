import express from "express";
import {
  cancelPayment,
  payBooking,
  successPayment,
} from "../controllers/paypal";

const router = express.Router();

router.post("/pay/:bookingId", payBooking);
router.get("/:bookingId/success", successPayment);
router.get("/cancel", cancelPayment);

// export default router;
module.exports = router;
