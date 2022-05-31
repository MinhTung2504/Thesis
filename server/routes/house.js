import express from "express";
import {
  createHouse,
  deleteHouse,
  getAllHouses,
  getAllHouseTest,
  getHostHouses,
  getHouseById,
  updateHouse,
} from "../controllers/house";
import { auth, authPage } from "../middlewares";
const upload = require("../utils/multer");

const router = express.Router();

// router.post("/house/new", upload.single("image"), requireSignin, createHouse);
// router.post(
//   "/house/new",
//   upload.array("image"),
//   requireSignin,
//   auth,
//   createHouse
// );
router.post(
  "/house/new",
  upload.array("image"),
  auth,
  authPage(["host"]),
  createHouse
);
// router.get("/host/houses", requireSignin, auth, getHostHouses);
router.get("/host/houses", auth, authPage(["host"]), getHostHouses);

// router.get("/", getAllHouses);
router.get("/houses", getAllHouses);
router.get("/house/:houseId", getHouseById);
// router.put("/house/update/:houseId", requireSignin, updateHouse);
router.put("/house/update/:houseId", auth, authPage(["host"]), updateHouse);
// router.delete("/house/delete/:houseId", requireSignin, deleteHouse);
router.delete("/house/delete/:houseId", auth, authPage(["host"]), deleteHouse);

router.get("/houses-test", getAllHouseTest);

// export default router;
module.exports = router;
