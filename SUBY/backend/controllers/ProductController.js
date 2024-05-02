import Firm from "../models/Firm.js";
import Product from "../models/Product.js";
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

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestSeller, description } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ message: "firm not found" });
    }
    const product = new Product({
      productName,
      price,
      category,
      bestSeller,
      description,
      image,
      firm: firm._id,
    });

    const savedProduct = await product.save();
    if (!firm.products) {
      firm.products = [];
    }
    firm.products.push(savedProduct);
    await firm.save();
    return res
      .status(200)
      .json({ product: savedProduct, message: "Firm added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getProductByFirmID = async (req, res) => {
  try {
    console.log("firm controller req ", req.params);
    const firmId = req.params.firmId;
    console.log("firmId", firmId);
    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ message: "firm not found" });
    }
    const restaurantName = firm.firmName;
    const products = await Product.find({ firm: firmId });
    res.status(200).json({ restaurantName, products: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export default {
  upload: upload.single("image"),
  addProduct,
  getProductByFirmID,
};
