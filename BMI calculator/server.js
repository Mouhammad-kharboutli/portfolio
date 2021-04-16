const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  // console.log(req);
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/", function (reg, res) {
  console.log(reg.body);
  var wgt = parseFloat(reg.body.weight);
  var hgt = parseFloat(reg.body.height);
  var bmi = bmiCalculator(wgt, hgt);
  res.send(bmi);
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});

function bmiCalculator(weight, height) {
  height = height / 100;
  var bmi = weight / Math.pow(height, 2);
  bmi = Math.floor(bmi);

  if (bmi < 18.5) {
    return "Your BMI is <" + bmi + ">, so you are underweight.";
  }
  if (bmi >= 18.5 && bmi < 24.9) {
    return "Your BMI is <" + bmi + ">, so you have a normal weight.";
  }
  if (bmi >= 25 && bmi < 29.9) {
    return "Your BMI is <" + bmi + ">, so you have are overweight.";
  }

  if (bmi >= 30 && bmi < 34.9) {
    return "Your BMI is <" + bmi + ">, so you have are obese.";
  }

  if (bmi > 35) {
    return "Your BMI is <" + bmi + ">, so you have are extremly bese.";
  }
}
