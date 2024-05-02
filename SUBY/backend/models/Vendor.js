import mongoose from "mongoose";

const vendorSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firm: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Firm",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
