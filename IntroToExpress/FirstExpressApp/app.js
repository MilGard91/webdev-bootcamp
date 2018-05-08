const express = require("express");
const app = express();



app.get('/', (req, res) => res.send('Hello World!'));

app.get('/bye', (req, res) => res.send("Goodbye"));

app.get('/dog', (req, res) => {
    console.log("SOMEONE MADE A REQUEST ")
    res.send("MEOW!");
});

app.get('/r/:subredditName', (req, res) => {
    const subreddit = req.params.subredditName;
    res.send(`WELCOME TO THE ${subreddit.toUpperCase()} SUBREDDIT!`);
});

app.get('/r/:subredditName/comments/:id/:title', (req, res) => {
    console.log (req.params);
    res.send("WELCOME TO THE COMMENTS PAGE!");
});

app.get("*", (req, res) => {
    res.send("YOU ARE A STAR!!!")
})

app.listen(3000, () => console.log('Listening on port 3000!'));