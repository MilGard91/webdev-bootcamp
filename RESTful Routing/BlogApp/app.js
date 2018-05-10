const express = require ("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");

// APP CONFIG
mongoose.connect('mongodb://localhost/blog_app');
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test 1",
//     image: "data:image/png;base64,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",
//     body: "This is a test post"
// }, (err, blog) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log("POST ADDED:");
//         console.log(blog);
//     }
// });

// ROUTES
app.get("/", (req, res) => {
    res.redirect("/blogs");
})

//INDEX
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});
// NEW
app.get("/blogs/new", (req, res) => {
    res.render("new");
});
// CREATE
app.post("/blogs", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, (err, blog) => {
        if(err) {
            res.render("new");
        } else{
            res.redirect("/blogs");
        }
    });
});

//SHOW
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if(err){
            console.log("ERROR!");
            res.redirect("/blogs");
        } else{
            res.render("show", {blog:blog});
        }
    })
})

//EDIT
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if(err){
            res.redirect("/");
        } else{
            res.render("edit", {blog: blog});
        }
    });
});


//UPDATE
app.put("/blogs/:id", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE
app.delete("/blogs/:id", (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs");
        }
    })
});

app.listen(3000, () => console.log("Blog Server Started!"));