const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/authRoutes");
const app = express();

mongoose
  .connect(
    "mongodb+srv://manojkumarcse123:DGQeSSAjcXwAKZw8@cluster0.l7tuz8c.mongodb.net/fullstackecom"
  )
  .then(() => {
    console.log("db connected");
  });

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/", authRoutes);

app.listen(5000, () => {
  console.log("server starting..........");
});
