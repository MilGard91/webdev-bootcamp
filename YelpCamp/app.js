const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
});

const Campground = mongoose.model("Campground", campgroundSchema)


// Campground create

// Campground.create(
//     {
//         name:"Mountain Goat's Rest",
//         image: "https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg",
//         desc: "Peaceful mountain with a lot of wild goats "
//     }, (err, campground) => {
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");            
//             console.log(campground);
//         }
//     }
// )

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }});
    
});

app.post("/campgrounds", (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.desc;
    const newCamp = {name, image, desc};
    Campground.create(newCamp, (err, campground) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    })
    
});

app.listen(3000, () => console.log("YelpCamp Server Started!"));