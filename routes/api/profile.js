const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Profile = require("../../models/profile");
const User = require("../../models/user");

// GET - current users profile
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["username", "displayname"])
      .then(profile => res.status(200).json(profile))
      .catch(err => {
        errors.profile = "Profile not found";
        res.status(404).json(errors);
      });
  }
);

// GET - all profiles
router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["displayname", "username"])
    .then(profiles => res.status(200).json(profiles))
    .catch(err => {
      errors.profiles = "No profiles were found";
      res.status(404).json(errors);
    });
});

// GET - profile by user ID
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["displayname", "username"])
    .then(profile => res.status(200).json(profile))
    .catch(err => {
      errors.profile = "No profile found with that ID";
      return res.status(404).json(errors);
    });
});
// GET - profile by display name
router.get("/displayname/:display_name", (req, res) => {
  const errors = {};
  User.findOne({ displayname: req.params.display_name })
    .then(user => {
      Profile.findOne({ user: user.id })
        .populate("user", ["displayname", "username"])
        .then(profile => res.status(200).json(profile))
        .catch(err => {
          errors.profile = "No profile found with that ID";
          return res.status(404).json(errors);
        });
    })
    .catch(err => {
      errors.user = "No user found with that name";
      res.status(404).json(errors);
    });
});

// POST - add movie to watch list
router.post(
  "/addmovie",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const movieToAdd = {};

    if (req.body.title) movieToAdd.title = req.body.title;
    if (req.body.year) movieToAdd.year = req.body.year;
    if (req.body.rated) movieToAdd.rated = req.body.rated;
    if (req.body.genre) movieToAdd.genre = req.body.genre;
    if (req.body.plot) movieToAdd.plot = req.body.plot;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Check if movie was already added to watch list
        if (
          profile.movielist.filter(movie => movie.title === req.body.title)
            .length > 0
        ) {
          errors.watchlist = "Already added this movie to watchlist";
          return res.status(400).json(errors);
        }

        // Add movie to watch list
        profile.movielist.unshift(movieToAdd);

        // Save and send back profile
        profile
          .save()
          .then(profile => res.status(200).json(profile))
          .catch(err =>
            res.status(400).json({ error: "Profile could not be updated" })
          );
      })
      .catch(err => {
        errors.profile = "Profile could not be found";
        return res.status(404).json(errors);
      });
  }
);

// POST - add movie to already watched list
router.post(
  "/watchedmovie",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const movieToAdd = {};

    if (req.body.title) movieToAdd.title = req.body.title;
    if (req.body.year) movieToAdd.year = req.body.year;
    if (req.body.rated) movieToAdd.rated = req.body.rated;
    if (req.body.genre) movieToAdd.genre = req.body.genre;
    if (req.body.plot) movieToAdd.plot = req.body.plot;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Check if movie was already added to watched list
        if (
          profile.watchedlist.filter(movie => movie.title === req.body.title)
            .length > 0
        ) {
          errors.watchedlist = "Already added this movie to watchedlist";
          return res.status(400).json(errors);
        }

        // Add movie to watched list
        profile.watchedlist.unshift(movieToAdd);

        // Save and send back profile
        profile
          .save()
          .then(profile => res.status(200).json(profile))
          .catch(err =>
            res.status(400).json({ error: "Profile could not be updated" })
          );
      })
      .catch(err => {
        errors.profile = "Profile could not be found";
        return res.status(404).json(errors);
      });
  }
);
// TODO:
// DELETE - remove movie from watch list

// DELETE - remove movie from already watched list
module.exports = router;
