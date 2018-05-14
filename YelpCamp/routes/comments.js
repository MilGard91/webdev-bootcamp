const express = require("express");
const router = express.Router({mergeParams: true});
const middleware = require("../midleware");
const Comment = require("../models/comment");
const Campground = require("../models/campground");

// =================
// COMMENTS FORM
// =================

router.get("/new", middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err || !campground) {
      req.flash("error", "Campground not found");
      res.redirect("/campgrounds");
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});
// =================
// COMMENTS POST
// =================
router.post("/", middleware.isLoggedIn, (req, res) => {
  //FIND CAMPGROUND
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err || !foundCampground) {
      req.flash("error", "Camground not found");
      res.redirect("/campgrounds");
    } else {
      // CREATE NEW COMMENT
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          req.flash("error", "Something went wrong");
          res.redirect("/campgrounds/" + foundCampground._id)
        } else {
          comment.author.id=req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          // CONNECT COMMENT TO CAMPGROUND
          foundCampground.comments.push(comment);
          foundCampground.save();
          //REDIRECT TO CAMPGROUND SHOW PAGE
          res.redirect("/campgrounds/" + foundCampground._id);
        }
      });
    }
  });
});

// EDIT COMMENT
router.get("/:comment_id/edit", middleware.checkComment, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if(err || !foundCampground){
      req.flash("error", "Campground not found");
      return res.redirect("/campgrounds");
    }
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err){
        res.redirect("back");
      } else{
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment });
      }
    });
  }); 
});
//UPDATE COMMENT
router.put("/:comment_id", middleware.checkComment, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
    if(err){
      res.redirect("back");
    } else{
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY COMMENT
router.delete("/:comment_id", middleware.checkComment, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, err => {
    if(err){
      res.redirect("back");
    } else{
      req.flash("success", "Comment deleted");
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
})

module.exports = router;