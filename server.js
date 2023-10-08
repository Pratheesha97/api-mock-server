const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Load environment variables from a .env file if it exists
dotenv.config();

const app = express();
const port = 8000;

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(helmet()); // Adds security headers

// Define a simple GET endpoint
app.get('/api/data', (req, res) => {
  const data = {
    message: 'Hello, World!',
  };

  res.json(data);
});

// Define a POST endpoint
app.post('/api/postData', (req, res) => {
  const requestData = req.body;

  // Process the incoming data
  // For now, just echoing back the received data
  res.json(requestData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
