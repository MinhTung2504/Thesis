import express from "express";
import { getAllDes } from "../controllers/destination";

const router = express.Router();

router.get("/destinations", getAllDes);

// export default router;
module.exports = router;
