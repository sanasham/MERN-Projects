import express from "express";
import {
  vendorRegister,
  vendorLogin,
  getAllVendors,
  getVendorById,
} from "../controllers/VendorController.js";

const router = express.Router();

router.post("/register", vendorRegister);
router.post("/login", vendorLogin);
router.get("/all-vendors", getAllVendors);
router.get("/single-vendor/:id", getVendorById);

export default router;
