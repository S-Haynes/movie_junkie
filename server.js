const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");
const profileRoutes = require("./routes/api/profile");
const userRoutes = require("./routes/api/users");

// connect to db
mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true }
  )
  .then(res => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("HELLO THERE SERVER IS UP");
});

// use routes

app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);

// define port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server started on port " + port);
});
