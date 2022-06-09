import express from "express";
import {
  acceptBooking,
  cancelBooking,
  checkoutBooking,
  checkPaidBooking,
  createBooking,
  getBookingsOfHostHouses,
  getUserBooking,
  rejectBooking,
} from "../controllers/booking";
// import {
//   acceptRequest,
//   createRequest,
//   rejectRequest,
// } from "../controllers/request";
import { auth, authPage } from "../middlewares";

const router = express.Router();

// router.get("/booking", auth, authPage(["user", "admin"]), createRequest);
router.post("/booking/new", auth, createBooking);
router.get("/user/booking", auth, getUserBooking);
router.get("/host/bookings", auth, authPage(["host"]), getBookingsOfHostHouses);
router.put(
  "/host/bookings/accept/:bookingId",
  auth,
  authPage(["host"]),
  acceptBooking
);
router.put(
  "/host/bookings/reject/:bookingId",
  auth,
  authPage(["host"]),
  rejectBooking
);
router.put(
  "/host/bookings/checkout-success/:bookingId",
  auth,
  authPage(["host"]),
  checkoutBooking
);
router.put(
  "/host/bookings/paid-success/:bookingId",
  auth,
  authPage(["host"]),
  checkPaidBooking
);
router.put("/user/bookings/cancel/:bookingId", auth, cancelBooking);

// export default router;
module.exports = router;
