import express from "express";
import addFirm from "../controllers/FirmController.js";

import verifyToken from "../middlewares/VerifyToken.js";

const router = express.Router();
router.post("/add-firm", verifyToken, addFirm);

export default router;
