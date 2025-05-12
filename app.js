// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const connectDB = require('./config/db'); // Database connection logic
// const dotenv = require('dotenv');

// // Import Backend Routes
// const apiItemRoutes = require('./routes/itemsRoutes');
// const apiContainerRoutes = require('./routes/containersRoutes');
// const apiLogsRoutes = require('./routes/logsRoutes');
// const apiWasteRoutes = require('./routes/wasteRoutes');
// const simulateRoutes = require('./routes/simulateRoutes');
// const csvRoutes = require('./routes/csvRoutes');

// // Import Frontend Routes
// const pageRoutes = require('./routes/pages');

// // Initialize App
// const app = express();
// dotenv.config(); // Load environment variables
// connectDB(); // Connect to the database

// // Middleware
// app.use(bodyParser.json()); // JSON body parsing
// app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded body parsing
// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
// app.set('views', path.join(__dirname, 'views')); // Views directory
// app.set('view engine', 'ejs'); // View engine set to EJS

// // Backend API Routes
// app.use('/api/items', apiItemRoutes);
// app.use('/api/containers', apiContainerRoutes);
// app.use('/api/logs', apiLogsRoutes);
// app.use('/api/waste', apiWasteRoutes);
// app.use('/api/simulate', simulateRoutes);
// app.use('/api/csv', csvRoutes); // CSV API

// // Frontend Page Routes
// app.use('/', pageRoutes);

// // Server Startup
// const PORT = process.env.PORT || 3000; // Define the port
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Database connection logic
const dotenv = require('dotenv');

// Import Backend Routes
const apiItemRoutes = require('./routes/itemsRoutes');
const apiContainerRoutes = require('./routes/containersRoutes');
const apiLogsRoutes = require('./routes/logsRoutes');
const apiWasteRoutes = require('./routes/wasteRoutes');
const simulateRoutes = require('./routes/simulateRoutes');
const csvRoutes = require('./routes/csvRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Import Frontend Routes
const pageRoutes = require('./routes/pages');

// Initialize App
const app = express();
dotenv.config({ path: './config/config.env' }); // Load environment variables from a specific file
connectDB(); // Connect to the database

// Middleware
app.use(bodyParser.json({ limit: '10mb' })); // JSON body parsing with a limit
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); // URL-encoded body parsing with a limit
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.set('views', path.join(__dirname, 'views')); // Views directory
app.set('view engine', 'ejs'); // View engine set to EJS

// Error Handling Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Backend API Routes
app.use('/api/items', apiItemRoutes);
app.use('/api/containers', apiContainerRoutes);
app.use('/api/logs', apiLogsRoutes);
app.use('/api/waste', apiWasteRoutes);
console.log("Kam uaha se shuru");
app.use('/api/simulate', simulateRoutes);
console.log("kam yaha pe khatam");
app.use('/api/csv', csvRoutes); // CSV API
app.use('/api/dashboard', dashboardRoutes);
// Frontend Page Routes
app.use('/', pageRoutes);

// Error Handling for Unknown Routes
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error Handling for Server Errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Server Startup
const PORT = process.env.PORT || 3000; // Define the port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});