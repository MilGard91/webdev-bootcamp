const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String,
});

const Cat = mongoose.model("Cat", catSchema);

// adding a cat to DB

// const george = new Cat({
//     name: "Mrs. Norris",
//     age: 14,
//     temperament: "Evil"
// });

// george.save((err, cat) => {
//     if(err){
//         console.log("SOMETHING WENT WRONG");
//     } else {
//         console.log("WE JUST SAVED A CAT IN DB!");
//     }
// })

Cat.create({
    name: "Snowflake",
    age: 15,
    temperament: "Bland"
}, (err, cat) => {
    if(err){
        console.log(err);
    } else {
        console.log(cat)
    }
});

// retrive all the cats from DB

Cat.find({}, (err, cats) => {
    if(err) {
        console.log("Oh! No! Something went wrong!");
    } else {
        console.log("All the cats.......");
        console.log(cats);
    }
})