const Task = require("../models/Task");

const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Task not found" });
  }
};

const createTask = async (req, res) => {
  try {
    const newTasks = new Task(req.body);
    await Task.save();
    res.status(200).json(newTasks);
  } catch (err) {
    res.status(500).json({ message: "Task not found" });
  }
};

const updateTask = async (req, res) => {
  try {
    const updateTasks = Task.findByIdAndUpdate(req.params.taskId);
    await Task.save();
    res.status(200).json(updateTasks);
  } catch (err) {
    res.status(500).json({ message: "Task not found" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deleteTasks = await Task.findByIdAndDelete(req.params.taskId);
    if (!deleteTasks) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Task not found" });
  }
};
