const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// require models
const User = require("../../models/user");
const Profile = require("../../models/profile");

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
      //create the new user
      const newUser = new User({
        username: username,
        password: password
      });

      // hash the new user password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          //save the new user
          newUser
            .save()
            .then(user => {
              //create the new user profile
              const newProfile = new Profile({
                user: user._id
              });

              newProfile
                .save()
                .then(profile => {
                  return res.status(200).json({ user, profile });
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const errors = {};
  User.findOne({ username: username }).then(user => {
    // Check if user exists
    if (!user) {
      errors.username = "Invalid Username";
      return res.status(404).json(errors);
    }

    // User confirmed - compare passwords
    bcrypt
      .compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          // create user payload
          const payload = {
            id: user.id,
            username: user.username
          };
          // sign token to user
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) {
                errors.token = "Token could not be generated";
                return res.status(400).json(errors);
              }

              return res.status(200).json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Incorrect Password";
          return res.status(400).json(errors);
        }
      })
      .catch(err => {
        return res.status(404).json(err);
      });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id })
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: "user not found" });
        }
        return res.json({
          id: user.id,
          username: user.username
        });
      })
      .catch(err => {
        return res.status(404).json({ error: "user not found" });
      });
  }
);
module.exports = router;
