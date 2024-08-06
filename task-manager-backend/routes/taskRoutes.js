const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController.js');

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:taskId', taskController.getTaskById);
router.put('/:taskId', taskController.updateTask);  // Include this for updating tasks
router.delete('/:taskId', taskController.deleteTask);  // Include this for deleting tasks



module.exports = router;