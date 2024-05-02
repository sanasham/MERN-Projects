import express from "express";
import productController from "../controllers/ProductController.js";
const { addProduct, getProductByFirmID } = productController;
const router = express.Router();

router.post("/add-product/:firmId", addProduct);
router.get("/:firmId/products", getProductByFirmID);

export default router;
