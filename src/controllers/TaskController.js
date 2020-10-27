const taskFactory = require("../Models/Task");
const { tasks } = require("../Repositories/TaskRepository");
const TaskRepository = require("../Repositories/TaskRepository");

module.exports = {
  async index(req, res) {
    const tasks = TaskRepository.findAll();

    return res.json(tasks);
  },

  async show(req, res) {
    const { id } = req.params;
    const task = TaskRepository.findById(id);

    return res.json(task);
  },

  async store(req, res) {
    const { description, responsible } = req.body;
    const task = taskFactory(description, responsible);

    const savedTask = TaskRepository.save(task);

    return res.json(savedTask);
  },

  async update(req, res) {
    const { id } = req.params;
    const { description, responsible } = req.body;

    const task = TaskRepository.findById(id);
    task.description = description;
    task.responsible = responsible;

    const savedTask = TaskRepository.save(task);

    return res.json(savedTask);
  },

  async destroy(req, res) {
    const { id } = req.params;

    const task = TaskRepository.deleteById(id);

    return res.json(task);
  },
};
