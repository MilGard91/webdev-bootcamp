const Campground = require("../models/campground");
const Comment = require("../models/comment");

const middleware ={};


middleware.checkCampground = (req, res, next) => {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err || !foundCampground){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        })
    } else{
        req.flash("error", "You are not logged in.");
        res.redirect("back");
    }
}

middleware.checkComment = (req, res, next) => {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err || !foundComment) {
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else{
                if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that")
                    res.redirect("back");
                }
            }
        })
    }else{
        req.flash("error", "You are not logged in.")
        res.redirect("back");
    }
}

middleware.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    } else{
        req.flash("error", "You are not logged in.");
        res.redirect("/login");
    }
}

module.exports= middleware;