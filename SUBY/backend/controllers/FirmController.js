import Firm from "../models/Firm.js";
import Vendor from "../models/Vendor.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1 MB file size limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const vendor = await Vendor.findById(req.VendorId);
    console.log("firm controller ", vendor);
    if (!vendor) {
      return res.status(404).json({ message: "vendor not found" });
    }

    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });

    const savedFirm = await firm.save();
    if (!vendor.firm) {
      vendor.firm = [];
    }
    vendor.firm.push(savedFirm);
    await vendor.save();
    return res.status(200).json({ message: "Firm added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export default [upload.single("image"), addFirm];
