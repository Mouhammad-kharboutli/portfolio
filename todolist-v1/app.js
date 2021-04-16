const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { urlencoded } = require("body-parser");
// LI items that will be added
let items = ["Buy food", "Cook food", "Eat food"];

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// telling the application to use EJS as a render
app.set("view engine", "ejs");

// all css, images and JS scripts will be added explicitliy to express
app.use(express.static("public"));

app.get("/", function (req, res) {
  // We can make a calculation on server side
  var today = new Date();

  // one way of converting time
  let d = Intl.DateTimeFormat("us", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(today);
  console.log(d);

  // second way
  var options = {
    weekday: "long",
  };

  let date = today.toLocaleDateString("en-US", options);
  console.log(date);

  res.render("list", { whichDay: date, newListItems: items });

  app.post("/", (req, res) => {
    var item = req.body.newItem;
    items.push(item);
    console.log(items);
    res.redirect("/");
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started at port 3000");
});
