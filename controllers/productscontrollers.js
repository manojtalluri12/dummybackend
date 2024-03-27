const OrderModel = require("../Model/OrderModel.js");
const productModel = require("../Model/ProductModel.js");

exports.Product = async (req, res) => {
  try {
    const { title, description, price, rating, brand, category, thumbnail } =
      req.body;
    const newuser = new productModel({
      title,
      description,
      price,
      rating,
      brand,
      category,
      thumbnail,
    });
    await newuser.save();
    return res.json({ message: "product is added" });
  } catch (err) {
    //console.log(err);
    return res.status(500).json({ message: "server is loading wait please" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const exist = await productModel.find();
    res.json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server is loading wait please" });
  }
};
exports.orders = async (req, res) => {
  try {
    const { title, description, price, rating, brand, category, thumbnail } =req.body;
   // const exist = await OrderModel.findById(req.user.id);
   console.log(req.user.id);
    let newuser = new OrderModel({
      user: req.user.id,
      title,
      description,
      price,
      rating,
      brand,
      category,
      thumbnail,
    });
    await newuser.save();
    return res.json({ message: "ordered" });
  } catch (err) {
    //console.log(err);
    return res.status(500).json({ message: "server is loading wait please" });
  }
};

exports.getorders = async (req, res) => {
  //const exist = await OrderModel.findById(req.user.id);
  try {
   // console.log(req.user.id);
   const exist = await OrderModel.find();
   const map=exist.filter((each)=>each.user == req.user.id)
  // console.log(map)
    res.json(map);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "reload page" });
  }
};