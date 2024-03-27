const UserModel = require("../Model/UserModel");
const jwt = require("jsonwebtoken");
exports.test = (req, res) => {
  res.json({ message: "hi" });
};

exports.Register = async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;
    if (!username || !email || !password || !confirmpassword) {
      return res.status(400).json({ message: "please fill the form" });
    }
    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "email alredy register" });
    }
    if (password !== confirmpassword) {
      return res
        .status(400)
        .json({ message: "password and confirmpassword not match" });
    }
    let newuser = new UserModel({
      username,
      email,
      password,
      confirmpassword,
    });
    await newuser.save();
    res.status(200).json({ message: "sucessfully register" });
  } catch (error) {
    console.log();
    res.status(500).json({ message: "server error" });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await UserModel.findOne({ email });
    if (!email || !password) {
      return res.status(400).json({ message: "please provide credentials" });
    }
    if (!exist) {
      return res.status(400).json({ message: "email is not register" });
    }
    if (exist.password !== password) {
      return res.status(400).json({ message: "password  not match" });
    }
    let payload = {
      user: {
        id: exist._id,
      },
    };
    jwt.sign(payload, "jwt", { expiresIn: 9999999999990 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (error) {
    console.log();
    res.status(500).json({ message: "server error" });
  }
};

exports.Profile = async (req, res) => {
  try {
    let exist = await UserModel.findById(req.user.id);
    res.json(exist);
  } catch (error) {}
};
exports.ProfilEdit = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await UserModel.findByIdAndUpdate(req.params.id, {
      username,
      email,
      password,
    });
    return res
      .status(200)
      .json({ message: "sucessfully updated your account" });
  } catch (error) {
    console.log(error);
    res.json(500).json({ message: "server error" });
  }
};
exports.prodelete= async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "sucessfully deleted you account" });
  } catch (error) {
    console.log(error);
    
  }
};
