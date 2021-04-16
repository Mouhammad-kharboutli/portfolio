// Website can is live at :
// https://cryptic-reaches-19825.herokuapp.com/
// https://devcenter.heroku.com/
// https://nodejs.org/api/http.html#http_http_request_options_callback
// https://github.com/mailchimp/mailchimp-marketing-node/
// https://mailchimp.com/developer/marketing/api/lists/update-lists/
// https://us1.admin.mailchimp.com/account/api/
// https://us1.admin.mailchimp.com/account/api/

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { dirname } = require("path");

const app = express();
// include all static files in the project
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  console.log(req.body);
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const email = req.body.email;

  // res.send("Data recieved locally");
  // 249. Posting Data to Mailchimp's Servers via their API

  const userData = {
    // members is inside API link
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      },
    ],
  };
  // I need to send the data as string form
  const jsonData = JSON.stringify(userData);

  // const endpoint = "https://<dc>.api.mailchimp.com/3.0/lists"
  // API key
  // 80ca31f580fbbb03ee98629bfc872bd3-us1
  // Unique list id
  // 4466fa0ed4
  const url = "https://us1.api.mailchimp.com/3.0/lists/4466fa0ed4";

  const options = {
    method: "POST",
    auth: "Mouhammad:80ca31f580fbbb03ee98629bfc872bd3-us1",
  };
  //  make our request to send the data
  var requesttoAPI = https.request(url, options, function (respone) {
    if (respone.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    respone.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  // writing the data to the API
  requesttoAPI.write(jsonData);
  // We are done close the process
  requesttoAPI.end();
});

// routing back to the main page
app.post("/failure", function (req, res) {
  res.redirect("/");
});

// app.listen(3000(this need to be changed when we apply our code to server)
// process.env.PORT : choose the port on the fly
// process.env.PORT || 3000 :will run both on server and local host
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started at port 3000");
});
