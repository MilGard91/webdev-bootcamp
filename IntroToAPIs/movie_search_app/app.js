const express = require("express");
const app = express();
const request = require ("request");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search")
});

app.get("/results", (req, res) => {
    const query=req.query.search;
    const url= "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb"
    request(url, (error, response, body)=>{
        const parsedData = JSON.parse(body)
        if (!error && response.statusCode === 200){
            res.render("results", {data: parsedData});
        }
    })
});

app.listen(3000, ()=>console.log('Movie App Started!'));