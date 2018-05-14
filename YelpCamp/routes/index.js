const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// =================
//INDEX PAGE
// =================
router.get("/", (req, res) => {
  res.render("landing");
});

router.get("/register", (req, res) => {
  res.render("register", {page: 'register'});
});

router.post("/register", (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
      if (err) {
        return res.render("register", {error: err.message});
      }
      passport.authenticate("local")(req, res, () => {
        req.flash("success", "Welcome to YelpCamp " + user.username)
        res.redirect("/campgrounds");
      });
    });
});

// =================
// LOGIN
// =================
router.get("/login", (req, res) => {
  res.render("login", {page: 'login'});
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }),
  (req, res) => {}
);

// =================
//LOGOUT
// =================

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/campgrounds");
});

module.exports = router;
