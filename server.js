const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const keys = require("./config/keys");
const profileRoutes = require("./routes/api/profile");
const userRoutes = require("./routes/api/users");

// Body-Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport");

// connect to db
mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true }
  )
  .then(res => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// use routes

app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// define port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server started on port " + port);
});
