// Load environment variables before anything else so configuration values
// like PORT are available to the rest of the server setup.
require("dotenv").config();

// Import the libraries used to create the HTTP server and allow requests
// from other origins during local development or frontend integration.
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Create the Express application instance that will hold middleware,
// routes, and the server startup logic.
const app = express();

// Register global middleware so the API can accept cross-origin requests
// and automatically parse incoming JSON request bodies.
app.use(cors());
app.use(express.json());

// Add a simple health-check endpoint so you can quickly confirm the server
// is running and see the current response time from the backend.
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// Start the server on the configured environment port, or fall back to 5000
// so the app still runs locally when no PORT value is provided.
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
