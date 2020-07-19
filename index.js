const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/restapis", {
  useNewUrlParser: true,
});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", routes());
app.use(express.static("uploads"));
app.listen(5000);
