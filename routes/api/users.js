const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.send("User routing works");
});

// POST - Register a new user
router.post("/register", (req, res) => {
  const errors = {};
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }).then(user => {
    // Check if User Exists
    if (user) {
      errors.username = "Username already taken";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: username,
        password: password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
module.exports = router;
