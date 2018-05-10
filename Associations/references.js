const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

const Post = require("./models/post");
const User = require("./models/user");

Post.create({
  title: "How to cook the best burger pt. 4",
  content: "AKLSJDLAKSJD"
}, (err, post) => {
    User.findOne({email: "bob@gmail.com"}, (err, foundUser) => {
        if(err){
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save((err, data) =>{
                if(err){
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});

// Find user
// find all posts for that user

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec((err, user) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });


// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });