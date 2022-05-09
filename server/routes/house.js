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
router.post(
  "/house/new",
  upload.array("image"),
  requireSignin,
  auth,
  createHouse
);
router.get("/host/houses", requireSignin, auth, getHostHouses);

// router.get("/", getAllHouses);
router.get("/houses", getAllHouses);
router.get("/house/:houseId", getHouseById);
router.put("/house/update/:houseId", requireSignin, updateHouse);
router.delete("/house/delete/:houseId", requireSignin, deleteHouse);

// export default router;
module.exports = router;
