const Campground = require("../models/campground");
const Comment = require("../models/comment");

const middleware ={};


middleware.checkCampground = (req, res, next) => {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err){
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })
    } else{
        res.redirect("back");
    }
}

middleware.checkComment = (req, res, next) => {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err) {
                res.redirect("back");
            } else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        })
    }else{
        res.redirect("back");
    }
}

middleware.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    } else{
        res.redirect("/login");
    }
}

module.exports= middleware;