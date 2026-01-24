const express = require("express");
const http = require("http");
const cors = require("cors");
const initializeSocket = require("./socket/socket");
const rosBridgeConnection = require("./utils/ros/connection");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Socket.IO
const io = initializeSocket(server);

// Initialize ROS Bridge connection module
rosBridgeConnection.api.initialize(io);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`ROV Control Server running on http://localhost:${PORT}`);
  console.log(`Socket.IO ready for connections`);
});