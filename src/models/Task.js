const { model, Schema } = require("mongoose");

const taskSchema = new Schema({
  description: { type: String },
  responsible: { type: String },
  finished: { type: Boolean, default: false },
});

module.exports = model("Task", taskSchema);
