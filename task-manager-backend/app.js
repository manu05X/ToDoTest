require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


// const path = require('path');
// const fs = require('fs');

const app = express();
const corsOptions = {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE']
  };
  
  app.use(cors(corsOptions));
// Middleware
app.use(express.json());

// Custom Middleware - Logger (if you have it)
const logger = require('./middleware/logger.js');
app.use(logger);

// Database connection
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

/*
// Ensure the 'data' directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
    console.log(`Created 'data' directory at ${dataDir}`);
}

// Ensure 'tasks.json' file exists and initialize with empty array if not
const taskFilePath = path.join(dataDir, 'tasks.json');
if (!fs.existsSync(taskFilePath)) {
    fs.writeFileSync(taskFilePath, '[]', 'utf8');
    console.log(`Created 'tasks.json' file at ${taskFilePath}`);
}
*/

// Routes
const taskRoutes = require('./routes/taskRoutes.js');
app.use('/tasks', taskRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Home page');
});

// Start server
const PORT = 1234;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
