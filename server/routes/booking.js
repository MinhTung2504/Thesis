import express from "express";
import {
  acceptBooking,
  checkoutBooking,
  createBooking,
  getBookingsOfHostHouses,
  getUserBooking,
} from "../controllers/booking";
import { rejectRequest } from "../controllers/request";
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
  "/host/bookings/:bookingId/accepted",
  auth,
  authPage(["host"]),
  acceptBooking
);
router.put(
  "/host/bookings/:bookingId/rejected",
  auth,
  authPage(["host"]),
  rejectRequest
);
router.put(
  "/host/bookings/:bookingId/checkout-success",
  auth,
  authPage(["host"]),
  checkoutBooking
);

// export default router;
module.exports = router;
