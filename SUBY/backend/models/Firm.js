import mongoose from "mongoose";

const firmSchema = new mongoose.Schema(
  {
    firmName: {
      type: String,
      required: true,
      unique: true,
    },
    area: {
      type: String,
      required: true,
    },
    category: [
      {
        type: String,
        enum: ["veg", "non-veg"],
      },
    ],
    region: [
      {
        type: String,
        enum: ["south-indian", "north-indian", "chinese", "bakery"],
      },
    ],
    offer: {
      typeof: String,
    },
    image: {
      type: String,
    },
    vendor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const Firm = mongoose.model("Firm", firmSchema);

export default Firm;
