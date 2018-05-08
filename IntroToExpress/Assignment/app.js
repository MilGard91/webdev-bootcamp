const express = require("express");
const app = express();

// ROUTES

// root

app.get("/", (req, res) => {
  res.send("Welcome to my assignment");
});

app.get("/speak/:animal", (req, res) => {
  switch (req.params.animal) {
    case "pig":
      res.send('Pig says "Oink"');
      break;
    case "cow":
      res.send('Cow says "Moo"');
      break;
    case "dog":
      res.send('Dog says "Woof Woof"');
      break;
    case "cat":
      res.send('Cat sys "MEOW"');
      break;
    case "snake":
      res.send('Snake says "SsssSsssSss"');
      break;
    default:
      res.send("WHAT DOES THE FOX SAY?!?!?");
  }
});
app.get("/repeat/:word/:times", (req, res) => {
  const word = req.params.word;
  const times = Number(req.params.times);
  let result = "";
  for (let i = 0; i < times; i++) {
    result += " " + word;
  }
  res.send(result);
});
app.get("*", (req, res) => {
  res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(3000, () => console.log("Listening on port 3000!"));
