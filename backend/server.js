const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

/**
 * CONCEPT: Express.js Framework
 * Express is a minimal web framework for Node.js.
 * It helps create HTTP servers and routes requests to handlers.
 */
const app = express();

/**
 * CONCEPT: Middleware
 * Middleware functions process requests before they reach route handlers.
 * They sit in the middle of the request-response cycle.
 */

// MIDDLEWARE 1: CORS (Cross-Origin Resource Sharing)
// Allows requests from different domains (frontend running on different port).
app.use(cors());

// MIDDLEWARE 2: Body Parser
// Automatically parses incoming JSON request bodies into JavaScript objects.
app.use(express.json());

// CONCEPT: MongoDB Connection with Mongoose
// Mongoose is an ODM (Object Document Mapper) that provides schema validation.
// .connect() tries to connect to MongoDB at the specified URL.
// .then() runs if connection succeeds, .catch() if it fails.
// Note: Connection error here won't stop the server from starting (check console output).
mongoose
  .connect("mongodb://localhost:27017/blogdb")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

/**
 * CONCEPT: Routing
 * app.use("/api/posts", ...) mounts all routes from post.js under the /api/posts path.
 * So POST /api/posts triggers the POST handler in post.js routes.
 */
app.use("/api/posts", require("./routes/post"));

/**
 * CONCEPT: Server Startup
 * app.listen() starts the HTTP server on the specified PORT.
 * Server runs continuously and listens for incoming requests.
 */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
