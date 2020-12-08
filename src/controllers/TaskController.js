const Joi = require("joi");
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

    const schema = Joi.object({
      description: Joi.string().trim().required().messages({
        "any.required": "A descrição da tarefa não pode estar vazia",
        "string.empty": "A descrição da tarefa não pode estar vazia",
      }),
      responsible: Joi.string().trim().required().messages({
        "any.required": "O responsável da tarefa não pode estar vazio",
        "string.empty": "O responsável da tarefa não pode estar vazio",
      }),
    });

    try {
      const value = await schema.validateAsync({
        description,
        responsible,
      });

      const task = new Task();

      task.description = value.description;
      task.responsible = value.responsible;

      const savedTask = await task.save();

      return res.json(savedTask);
    } catch (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { description, responsible, finished } = req.body;

    const schema = Joi.object({
      description: Joi.string().trim().required().messages({
        "any.required": "A descrição da tarefa não pode estar vazia",
        "string.empty": "A descrição da tarefa não pode estar vazia",
      }),
    });

    try {
      const value = await schema.validateAsync({
        description,
      });

      const savedTask = await Task.findByIdAndUpdate(
        { _id: id },
        { description: value.description, responsible, finished },
        { new: true, omitUndefined: true }
      );

      return res.json(savedTask);
    } catch (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  },

  async destroy(req, res) {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    return res.json(task);
  },
};
