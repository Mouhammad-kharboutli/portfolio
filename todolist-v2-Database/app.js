//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");


const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// local host
// mongodb://localhost:27017/todolistDB
mongoose.connect("mongodb+srv://Admin-Mouhammad:Test-123@cluster0.qfeva.mongodb.net/todoDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("item", itemSchema);

const item1 = new Item({
  name: "Welcome to your todolist!",
});

const item2 = new Item({
  name: "hit the + button to add a new item",
});

const item3 = new Item({
  name: "hit the checkbox to delete an item",
});

const defaultItems = [item1, item2, item3];

// differnet lists based on custom library that user types in the url
const listSchema = mongoose.Schema({
  name: String,
  items: [itemSchema],
});

const List = mongoose.model("List", listSchema);


app.get("/", function (req, res) {
  const day = date.getDate();

  Item.find({}, function (err, foundedItems) {
    if (err) {
      console.log(err);
    } else {
      // insert the default values
      if (foundedItems.length === 0) {
        Item.insertMany(defaultItems, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Insertion of default items went successfully ");
          }
        });
        // after insertion of the default data go back to home page again
        res.redirect("/");
      } else {
        // render the items found
        res.render("list", { listTitle: "Today", newListItems: foundedItems });
      }
    }
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName,
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});


app.post("/delete", function (req, res) {
  // id of the item
  const itemWillBeDeleted = req.body.checkbox;
  // Which list came from
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.deleteOne({ _id: itemWillBeDeleted }, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Item is deleted successfully");
        res.redirect("/");
      }
    });
  } else {

    List.findOneAndUpdate({ name: listName},
      {$pull:{items:{_id:itemWillBeDeleted}}},
      function(err){
        if(!err){
          res.redirect("/"+listName);
        }
      });

  }
});


app.get("/about", function (req, res) {
  res.render("about");
});


app.get("/:customlink", function (req, res) {
  const customListName = _.capitalize(req.params.customlink);

  List.findOne({ name: customListName }, function (err, dataResult) {
    if (err) {
      console.log(err);
    } else {
      if (dataResult) {
        // data exists , just show them
        res.render("list", {
          listTitle: dataResult.name,
          newListItems: dataResult.items,
        });
      } else {
        // console.log("data does not exist");
        // the data did not exist , I need to create them
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + customListName);
      }
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
