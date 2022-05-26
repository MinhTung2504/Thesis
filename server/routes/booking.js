import express from "express";
import {
  acceptBooking,
  checkoutBooking,
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

// export default router;
module.exports = router;
