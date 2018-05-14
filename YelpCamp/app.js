const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const moment = require("moment")
const Campground = require("./models/campground");
const User = require("./models/user");
const Comment = require("./models/comment");
const seedDB = require("./seed");
// =================
const indexRoutes = require("./routes/index")
const campgroundRoutes = require("./routes/campgrounds")
const commentsRoutes = require("./routes/comments")

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = moment;
// seedDB(); //SEEDS THE DATABASE

// =================
// PASSPORT CONFIG
// =================
app.use(require("express-session")({
  secret: "They said there will be candies",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// =================
// ROUTES
// =================
app.use("/", indexRoutes)
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments", commentsRoutes)

app.listen(3000, () => console.log("YelpCamp Server Started!"));
