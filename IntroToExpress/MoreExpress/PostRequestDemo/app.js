const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

const friends = ["Ted", "Robin", "Marshal", "Lily", "Barney"];

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/friends", (req, res) => {
    res.render("friends", {friends: friends});
});

app.post('/addfriend', (req, res) => {
    const newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends")
});

app.listen(3000, () => console.log("Server started!"));