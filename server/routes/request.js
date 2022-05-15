import express from "express";
import {
  acceptRequest,
  createRequest,
  rejectRequest,
} from "../controllers/request";
import { auth, authPage } from "../middlewares";

const router = express.Router();

router.get("/user/request", auth, authPage(["user", "admin"]), createRequest);
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

// export default router;
module.exports = router;
