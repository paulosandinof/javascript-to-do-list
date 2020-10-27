const path = require("path");
const express = require("express");

const routes = require("./routes");

const app = express();

app.use(express.json());

app.use("/api", routes);

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen("3000");