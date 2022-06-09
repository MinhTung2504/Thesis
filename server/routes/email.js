import express from "express";
import { sendEmail } from "../controllers/email";

const router = express.Router();

router.post("/send-email", sendEmail);

// export default router;
module.exports = router;
