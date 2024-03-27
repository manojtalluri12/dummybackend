const express = require("express");
//const h=require('./../app/src/images')
const {
  test,
  Register,
  Login,
  Profile,
  ProfilEdit,prodelete
} = require("../controllers/userController.js");
const {
  Product,
  getProduct,
  orders,
  getorders
} = require("../controllers/productscontrollers.js");
const { middleware } = require("../middleware/middleware.js");

/*
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./../TOKECOOK/app/src/images"); // Make sure this uploads directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });*/
const router = express.Router();
router.get("/", test);
router.post("/register", Register);
router.post("/login", Login);
router.post("/product", Product);
router.get("/getproduct", getProduct);
router.get("/profile", middleware, Profile);
router.post("/order", middleware, orders);
router.get("/getorders", middleware, getorders);
router.patch('/edit/:id',ProfilEdit)
router.delete('/delete/:id',prodelete)
module.exports = router;
