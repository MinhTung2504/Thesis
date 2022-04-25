import express from "express";
import { createHouse, getAllHouses } from "../controllers/house";
import { requireSignin } from "../middlewares";

const router = express.Router();

router.post("/house/new", requireSignin, createHouse);
router.get("/house", getAllHouses);

// export default router;
module.exports = router;
