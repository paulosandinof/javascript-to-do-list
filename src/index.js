require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}` +
    `@${process.env.MONGO_DB_CLUSTER}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

app.use(express.json());

app.use("/api", routes);

app.use("/public", express.static(__dirname + "/views/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.listen("3000");
