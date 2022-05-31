import express from "express";
import {
  banUser,
  editRoleUser,
  getAllBannedUsers,
  getAllUsers,
  getUser,
  getUserByMonth,
  unbanUser,
} from "../controllers/user";
import { auth, authPage } from "../middlewares";

const router = express.Router();

router.get("/users", auth, authPage(["admin"]), getAllUsers);
router.get("/users/isbanned", auth, authPage(["admin"]), getAllBannedUsers);
router.get("/users/:userId", auth, getUser);
router.put("/users/:userId/banned", auth, authPage(["admin"]), banUser);
router.put("/users/:userId/unbanned", auth, authPage(["admin"]), unbanUser);
router.put("/users/editRole/:userId", auth, authPage(["admin"]), editRoleUser);

router.get("/usersstatistics", auth, authPage(["admin"]), getUserByMonth);

// export default router;
module.exports = router;
