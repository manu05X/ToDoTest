// const fs = require('fs');
// const path = require('path');

const Task = require('../models/Task');


/*
const dataDir = path.join(__dirname, '..', 'data');
// Path to the JSON file where tasks will be stored
const taskFilePath = path.join(__dirname, '../data/tasks.json');


// Utility function to read tasks from the file
const readTasks = () => {
   try{
    const tasksdata = fs.readFileSync(taskFilePath, 'utf8');
    return JSON.parse(tasksdata);
   } catch(err){
        if(err.code === 'ENOENT') {
            // File not found error
            console.error(`Error: Tasks file not found at ${taskFilePath}. Returning empty array.`);
            return [];
        }
         // Throw other errors for higher level handling
         throw new Error(`Error reading tasks file: ${err.message}`);
   };
};

// Utility function to write tasks to the file
const writeTasks = (tasks) => {
    fs.writeFileSync(taskFilePath, JSON.stringify(tasks, null, 2), 'utf8');
};
*/

const getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error getting tasks', error });
    }
  };

const getTaskById = async(req, res) => {
    try{
        const task = await Task.findById(req.params.taskId);
        if(!task){
            return res.status(404).json({message: 'Task Not Found'});
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message : 'Error getting task', error});
    }
};

// const createTask = (req, res) => {
//     const tasks = readTasks();
//     const newTask = { id: String(tasks.length + 1), ...req.body };
//     tasks.push(newTask);
//     writeTasks(tasks);
//     res.status(201).json(newTask);
// };

const createTask = async (req, res) => {
    try {
      const newTask = new Task(req.body);
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error });
    }
  };

// const updateTask = (req, res) => {
//     const tasks = readTasks();
//     const taskIndex = tasks.findIndex(t => t.id === req.params.taskId);
//     if (taskIndex === -1) {
//         return res.status(404).json({ message: 'Task not found' });
//     }
//     tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
//     writeTasks(tasks);
//     res.json(tasks[taskIndex]);
// };

const updateTask = async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
        new: true,
      });
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error });
    }
  };

// const deleteTask = (req, res) => {
//     let tasks = readTasks();
//     const taskIndex = tasks.findIndex(t => t.id === req.params.taskId);
//     if (taskIndex === -1) {
//         return res.status(404).json({ message: 'Task not found' });
//     }
//     tasks = tasks.filter(t => t.id !== req.params.taskId);
//     writeTasks(tasks);
//     res.status(204).send();
// };

const deleteTask = async (req, res) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error });
    }
  };
  

module.exports = {
    // readTasks,
    // writeTasks,
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
