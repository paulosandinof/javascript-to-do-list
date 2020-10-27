const express = require("express");
const TaskController = require("./controllers/TaskController");

const routes = express.Router();

routes.get("/task", TaskController.index);
routes.get("/task/:id", TaskController.show);
routes.post("/task", TaskController.store);
routes.patch("/task/:id", TaskController.update);
routes.delete("/task/:id", TaskController.destroy);

module.exports = routes;
