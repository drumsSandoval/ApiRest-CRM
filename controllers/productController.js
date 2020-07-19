const Product = require("../models/Product");
const multer = require("multer");
const shortid = require("shortid");

const configMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato No Valido"));
    }
  },
};

const upload = multer(configMulter).single("image");

exports.uploadFile = (req, res, next) => {
  console.log(req.body);
  upload(req, res, function (error) {
    if (error) {
      res.json({ msg: "Hubo un error" }, 403);
    }
    return next();
  });
};

exports.newProduct = async (req, res, next) => {
  console.log("Entra a NewProduct");
  console.log("requ.body: ", req.body);
  const product = new Product(req.body);

  try {
    if (req.file && req.file.filename) {
      product["image"] = req.file.filename;
    }
    console.log("Aqui ya no entra");
    await product.save();

    console.log("Aqui ya no entra");
    res.json({ data: product });
    console.log("Aqui ya no entra");
  } catch (error) {
    res.json({ error: error });
    next();
  }
};

exports.showProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json({ data: products });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.showProduct = async (req, res, next) => {
  console.log(req.params);
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.json({ msg: "Ese producto no existe" });
    return next();
  }
  res.json({ data: product });
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.json({ msn: "ID Producto No Valido" });
      return next();
    }
    let newProduct = req.body;
    if (req.file && req.file.filename) {
      newProduct["image"] = req.file.filename;
    } else {
      newProduct["image"] = product["image"];
    }
    const update = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      newProduct,
      { new: true }
    );

    res.json(update);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete({ _id: req.params.id });
    res.json({ msg: "El producto se ha eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.searchProduct = async (req, res, next) => {
  try {
    const { query } = req.params;
    const product = await Product.find({ name: new RegExp(query, "i") });
    res.json({ data: product });
  } catch (error) {
    console.log(error);
    next();
  }
};
