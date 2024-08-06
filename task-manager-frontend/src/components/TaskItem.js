import React from 'react';
import axios from '../axiosConfig'; // Import the axios instance

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const handleStatusChange = async (e) => {
    console.log(task);
    const updatedTask = { ...task, status: e.target.value };
    try {
      await axios.put(`/tasks/${task._id}`, updatedTask);
      updateTask(updatedTask);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/tasks/${task._id}`);
      deleteTask(task._id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div>
        <label>Status: </label>
        <select value={task.status} onChange={handleStatusChange}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <button onClick={() => updateTask(task)} className="update-task">Update Status</button>
      <button onClick={handleDelete} className="delete-task">Delete Task</button>
    </div>
  );
};

export default TaskItem;
