import express from "express";
import { createHouse, getAllHouses, getHouseById } from "../controllers/house";
import { requireSignin } from "../middlewares";

const router = express.Router();

// router.post("/house/new", requireSignin, createHouse);
router.get("/houses", getAllHouses);
router.get("/house/:houseId", getHouseById);

// export default router;
module.exports = router;
