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
    if (req.body.poster) movieToAdd.poster = req.body.poster;

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
    if (req.body.poster) movieToAdd.poster = req.body.poster;

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
router.delete(
  "/bucketlist/:movie_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.unauthorized = "User not authorized to make this request";
          return res.status(401).json(errors);
        }

        // find index of movie to delete from bucket list
        const removeIndex = profile.movielist.findIndex(movie =>
          movie._id.equals(req.params.movie_id)
        );

        //splice movie from the array
        profile.movielist.splice(removeIndex, 1);

        //save the profile
        profile
          .save()
          .then(profile => res.status(200).json(profile))
          .catch(err => {
            errors.dberror = "Profile could not be saved";
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.profile = "Profile could not be found";
        return res.status(404).json(errors);
      });
  }
);

// DELETE - remove movie from already watched list
router.delete(
  "/alreadywatched/:movie_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.unauthorized = "User not authorized to make this request";
          return res.status(401).json(errors);
        }

        // find index of movie to delete from watched list
        const removeIndex = profile.watchedlist.findIndex(movie =>
          movie._id.equals(req.params.movie_id)
        );

        //splice movie from the array
        profile.watchedlist.splice(removeIndex, 1);

        //save the profile
        profile
          .save()
          .then(profile => res.status(200).json(profile))
          .catch(err => {
            errors.dberror = "Profile could not be saved";
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.profile = "Profile could not be found";
        return res.status(404).json(errors);
      });
  }
);
module.exports = router;
