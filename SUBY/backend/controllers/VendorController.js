import Vendor from "../models/Vendor.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const vendorRegister = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const vendorEmail = await Vendor.findOne({ email });
    if (vendorEmail) {
      return res.status(400).json("email already in taken");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newVendor = new Vendor({
      userName,
      email,
      password: hashedPassword,
    });
    await newVendor.save();
    res.status(201).json({ message: "Vendor registered successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

const vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendorInput = await Vendor.findOne({ email: email });
    console.log("vendor input", vendorInput);

    if (vendorInput) {
      const comparePassword = await bcrypt.compare(
        password,
        vendorInput?.password
      );
      console.log("compare password", comparePassword);
      if (!comparePassword) {
        res.status(404).json({
          error: "Entered password is wrong. Please provide valied password",
        });
      } else {
        const token = jwt.sign(
          { vendorId: vendorInput._id },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        console.log("token: " + token);
        res
          .status(200)
          .json({ message: "user logged in successfully", token: token });
      }
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("firm");
    res.json({ vendors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const getVendorById = async (req, res) => {
  const vendorId = req.params.id;
  console.log("getVendorById", vendorId);
  try {
    const vendor = await Vendor.findById(vendorId).populate("firm");
    if (!vendor) {
      return res.status(404).send({ message: "No vendor found" });
    }
    res.status(200).json({ vendor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

export { vendorRegister, vendorLogin, getAllVendors, getVendorById };
