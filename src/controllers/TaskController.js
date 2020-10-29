const taskFactory = require("../models/Task");
const Task = require("../models/Task");

module.exports = {
  async index(req, res) {
    const tasks = await Task.find();

    return res.json(tasks);
  },

  async show(req, res) {
    const { id } = req.params;
    const task = await Task.findById(id);

    return res.json(task);
  },

  async store(req, res) {
    const { description, responsible } = req.body;

    const task = new Task();

    task.description = description;
    task.responsible = responsible;

    const savedTask = await task.save();

    return res.json(savedTask);
  },

  async update(req, res) {
    const { id } = req.params;
    const { description, responsible, finished } = req.body;

    const savedTask = await Task.findByIdAndUpdate(
      { _id: id },
      { description, responsible, finished },
      { new: true, omitUndefined: true }
    );

    return res.json(savedTask);
  },

  async destroy(req, res) {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    return res.json(task);
  },
};
