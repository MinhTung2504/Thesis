import express from "express";
import { countAllFeaturesByHost, hostCountCompletedBookingsByYear, hostCountRevenuesByYear } from "../controllers/statisticByHost";
import { auth, authPage } from "../middlewares";

const router = express.Router();

router.get("/host/count-all-features", auth, authPage(["host"]), countAllFeaturesByHost);
router.get("/host/count-completed-booking-year", auth, authPage(["host"]), hostCountCompletedBookingsByYear)
router.get("/host/count-revenue-year", auth, authPage(['host']), hostCountRevenuesByYear)

// export default router;
module.exports = router;