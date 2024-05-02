import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import routes from "./routes/vendorRoutes.js";
import firmRoutes from "./routes/firmRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import bodyParser from "body-parser";

const app = express();

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(`MongoDB Connected successfully`);
  })
  .catch((err) => {
    console.log(err);
  });
app.use(bodyParser.json());

app.use("/vendor", routes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);

app.use("/", (req, res) => {
  res.send("welcome to SUBY");
});

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
