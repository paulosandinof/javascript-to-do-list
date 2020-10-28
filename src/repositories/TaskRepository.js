const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

async function init() {
  try {
    var list = await readFile('./src/data/mock-data.json');
    list = JSON.parse(list);

    return list;
  }
  catch (err) {
    console.log(err)
  }
}

function saveToFile(tasks){
  var writer = fs.createWriteStream('./src/data/mock-data.json');
  writer.write(JSON.stringify(tasks));
}

module.exports = {
  tasks: [],

  async findAll() {
    this.tasks = await init();

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
      this.tasks[index].isDone = task.isDone;
    } else {
      this.tasks.push(task);
    }

    saveToFile(this.tasks);

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
