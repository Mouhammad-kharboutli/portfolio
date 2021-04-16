// declare and require libraries
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// get
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// post
app.post("/", function (req, res) {
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var operator = req.body.operation;
console.log(num1,num2,operator);


function calculate(n1, n2, oper) {
    return oper(n1, n2);
  }
function plus(n1, n2) {
    return n1 + n2;
  }
  function minus(n1, n2) {
    return n1 - n2;
  }
  function multi(n1, n2) {
    return n1 * n2;
  }
  function divid(n1, n2) {
    return n1 / n2;
  }
  
  var result = calculate(num1, num2, operator);
  res.send("The result: " + result);
});

// listen
app.listen(3000, function () {
  console.log("Server started at port 3000");
});
