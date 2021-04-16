const express = require("express");
const bodyParser = require("body-parser");
const https = require("http");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var city = req.body.cityName;

  // API endpoint, path & parameters
  const API_key = "1cdea263c50baeadb7f00e1bb81847f6";
  const unit = "metric";
  const API_url =
    "http://api.openweathermap.org/data/2.5/weather?appid=" +
    API_key +
    "&q=" +
    city +
    "&units=" +
    unit;
  // API request
  https.get(API_url, function (response) {
    // check the response from the API server
    console.log(response.statusCode);
    // API data handling
    response.on("data", function (data) {
      // HEX data to JSON
      var weatherData = JSON.parse(data);
      const description = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const imageData = weatherData.weather[0].icon;
      var imgURL = "http://openweathermap.org/img/wn/" + imageData + "@4x.png";

      // Data sending to browser
      res.write(
        "<p>The weather in " + city + " currently is " + description + " </p>"
      );
      res.write("<h1>The temperatur is " + temp + " degrees Celcius. </h1>");
      res.write("<img src=" + imgURL + ">");
      res.send();
    });
  });
});

// Listen to the port
app.listen(3000, function () {
  console.log("Server started at port 3000");
});
