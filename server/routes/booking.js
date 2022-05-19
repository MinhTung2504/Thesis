import express from "express";
import { createBooking, getUserBooking } from "../controllers/booking";
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
// router.put(
//   "/user/request/:requestId/accepted",
//   auth,
//   authPage(["admin"]),
//   acceptRequest
// );
// router.put(
//   "/user/request/:requestId/rejected",
//   auth,
//   authPage(["admin"]),
//   rejectRequest
// );

// export default router;
module.exports = router;
