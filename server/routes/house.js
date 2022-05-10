import express from "express";
import {
  createHouse,
  deleteHouse,
  getAllHouses,
  getHostHouses,
  getHouseById,
  updateHouse,
} from "../controllers/house";
import { auth, housesOfHost, requireSignin } from "../middlewares";
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
router.post("/house/new", upload.array("image"), auth, createHouse);
// router.get("/host/houses", requireSignin, auth, getHostHouses);
router.get("/host/houses", auth, getHostHouses);

// router.get("/", getAllHouses);
router.get("/houses", getAllHouses);
router.get("/house/:houseId", getHouseById);
// router.put("/house/update/:houseId", requireSignin, updateHouse);
router.put("/house/update/:houseId", auth, updateHouse);
// router.delete("/house/delete/:houseId", requireSignin, deleteHouse);
router.delete("/house/delete/:houseId", auth, deleteHouse);

// export default router;
module.exports = router;
