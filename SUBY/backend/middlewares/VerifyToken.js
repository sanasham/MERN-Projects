import Vendor from "../models/Vendor.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY;
const verifyToken = async (req, res, next) => {
  //console.log("verify token entered");
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ error: "Invalid token is required" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("decoded value: ", decoded);
    const vendor = await Vendor.findById(decoded.vendorId);
    console.log("verify token vendor", vendor);
    if (!vendor) {
      return res.status(401).json({ error: "Vendor not found" });
    }
    req.VendorId = vendor._id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "invalied token" });
  }
};

export default verifyToken;
