import express from "express";
import {
    countAllSystemFeatures,
    countHouseFollowingCities,
    getHouseDataByYear,
    getUserDataByYear,
} from "../controllers/statistic";
import { auth, authPage } from "../middlewares";

const router = express.Router();

router.get("/get-user-statistic", auth, authPage(["admin"]), getUserDataByYear);
router.get(
    "/get-house-statistic",
    auth,
    authPage(["admin"]),
    getHouseDataByYear
);
router.get(
    "/count-house-by-city",
    auth,
    authPage(["admin"]),
    countHouseFollowingCities
);
router.get(
    "/count-all-features",
    auth,
    authPage(["admin"]),
    countAllSystemFeatures
);

// export default router;
module.exports = router;
