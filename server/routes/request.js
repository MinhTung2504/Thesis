import express from "express";
import {
  acceptRequest,
  allRequests,
  createRequest,
  getUserRequest,
  rejectRequest,
} from "../controllers/request";
import { auth, authPage } from "../middlewares";

const router = express.Router();

router.post("/user/request", auth, authPage(["user", "admin"]), createRequest);
router.put(
  "/user/request/:requestId/accepted",
  auth,
  authPage(["admin"]),
  acceptRequest
);
router.put(
  "/user/request/:requestId/rejected",
  auth,
  authPage(["admin"]),
  rejectRequest
);
router.get("/user/all-requests", auth, authPage(["admin"]), allRequests);
router.get("/user-requests", auth, authPage(["user"]), getUserRequest);

// export default router;
module.exports = router;
