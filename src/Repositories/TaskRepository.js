module.exports = {
  tasks: [],

  findAll() {
    return this.tasks;
  },

  findById(id) {
    return this.tasks.find((task) => task.id === id);
  },

  save(task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);

    if (index !== -1) {
      this.tasks[index].description = task.description;
      this.tasks[index].responsible = task.responsible;
    } else {
      this.tasks.push(task);
    }

    return task;
  },

  deleteById(id) {
    const index = this.tasks.findIndex((t) => t.id === id);

    const task = this.tasks[index];

    if (index !== -1) {
      task = this.tasks.splice(index, 1);
    }

    return task;
  },
};
