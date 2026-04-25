// Load environment variables from .env file into process.env
// This must be called before any other modules that use environment variables
require("dotenv").config();

// Import Express.js for building the API server
// Import CORS to allow cross-origin requests from frontend applications
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Create an Express application instance
const app = express();

// Enable CORS middleware so the API can accept requests from different origins
// This is essential when the frontend runs on a different port than the backend
app.use(cors());

// Parse incoming JSON request bodies
// This allows routes to access request data via req.body
app.use(express.json());

// Health check endpoint to verify the server is running
// Returns status and server timestamp for monitoring/load balancer checks
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// Start the server and listen on the configured port (or 5000 as default)
// Using an environment variable allows flexibility across dev/staging/prod environments
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
startServer();