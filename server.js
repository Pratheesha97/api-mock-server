const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const soap = require('soap');
const fs = require('fs');

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


// Sample SOAP service implementation
const service = {
  WeatherService: {
    WeatherPort: {
      GetWeather: function(args, callback) {
        // Perform the logic to get the weather based on the location
        const location = args.location;
        const temperature = '25°C';
        const description = 'Sunny';

        // Return the response
        const result = {
          temperature: temperature,
          description: description
        };
        callback(null, result);
      }
    }
  }
};

// Read the WSDL file as an XML string
const wsdlXML = fs.readFileSync('wsdl/weatherService.wsdl', 'utf8');

// Create the SOAP server
soap.listen(app, '/weather', service, wsdlXML, function() {
  console.log('SOAP server running at http://localhost:8000/weather?wsdl');
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

