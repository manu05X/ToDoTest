const mongoose = require("mongoose");

const taskShcema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["TO Do", "UPDATING", "Delete"] },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
