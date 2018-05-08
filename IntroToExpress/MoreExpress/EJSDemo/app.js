const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render("home");
});

app.get('/fallinlovewith/:thing', (req, res) => {
    const thing = req.params.thing;
    res.render("love", {thingVar: thing});
})

app.get('/posts', (req, res) => {
    const posts = [
        {title: "Post 1", author: "Susy"},
        {title: "My adorable pet bunny", author: "Charlie"},
        {title: "Can you belive this pomsky?", author: "Colt"}
    ];
    res.render("posts", {posts: posts});
})

app.listen(3000, () => console.log("Listening on 3000"));
