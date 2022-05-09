import express from "express";
import { createHouse, getAllHouses, getHouseById } from "../controllers/house";
import { requireSignin } from "../middlewares";
const upload = require("../utils/multer");

const router = express.Router();

// router.post("/house/new", upload.single("image"), requireSignin, createHouse);
router.post("/house/new", upload.array("image"), requireSignin, createHouse);
// router.post(
//   "/house/new",
//   upload.array("image"),
//   auth,
//   createHouse
// );
// router.get("/", getAllHouses);
router.get("/houses", getAllHouses);
router.get("/house/:houseId", getHouseById);

// export default router;
module.exports = router;
