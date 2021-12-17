require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const routerSubscriber = require("./router/subscribers");

const app = express();
const PORT = 3000 || process.env.PORT;
app.use(express.json());
app.use("/api", routerSubscriber);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Db connections established successfully"));

app.listen(PORT, () => {
  console.log(`Server started successfully at port ${PORT}`);
});
