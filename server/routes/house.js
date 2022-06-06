import express from "express";
import {
  createHouse,
  deleteHouse,
  getAllHouses,
  getHostHouses,
  getHouseById,
  updateHouse,
} from "../controllers/house";
import { auth, authPage } from "../middlewares";
const upload = require("../utils/multer");

const router = express.Router();

router.post(
  "/house/new",
  upload.array("image"),
  auth,
  authPage(["host"]),
  createHouse
);
router.get("/host/houses", auth, authPage(["host"]), getHostHouses);
router.get("/houses", getAllHouses);
router.get("/house/:houseId", getHouseById);
router.put("/house/update/:houseId", auth, authPage(["host"]), updateHouse);
router.delete("/house/delete/:houseId", auth, authPage(["host"]), deleteHouse);

// export default router;
module.exports = router;
