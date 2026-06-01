const router = require("express").Router();

const Post = require("../models/Post");

/**
 * CONCEPT: Express Router
 * Router() creates a mini-app for handling specific routes.
 * All routes in this file are relative to "/api/posts" (mounted in server.js).
 */

/**
 * ROUTE: GET /api/posts
 * CONCEPT: HTTP GET Request (Read)
 * Fetches all posts from MongoDB, sorted by creation date (newest first).
 * 
 * CONCEPT: Async/Await Pattern in Express
 * async function (req, res) => {...}
 * req = request object (contains query params, body, etc.)
 * res = response object (use res.json() to send JSON back)
 */
router.get("/", async (req, res) => {
  try {
    /**
     * CONCEPT: MongoDB Query
     * Post.find() fetches all posts from the "posts" collection.
     * .sort({ createdAt: -1 }) sorts by creation date in descending order (newest first).
     * await waits for the database to return the results.
     */
    const posts = await Post.find().sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    /**
     * CONCEPT: Error Handling
     * If something goes wrong, catch the error and send a 500 (server error) response.
     */
    res.status(500).json({
      error: err.message,
    });
  }
});

/**
 * ROUTE: POST /api/posts
 * CONCEPT: HTTP POST Request (Create)
 * Creates a new post with data from req.body (form fields sent from frontend).
 * 
 * CONCEPT: Mongoose .create()
 * Post.create(data) creates a new document in MongoDB and saves it automatically.
 * Returns the saved post with an auto-generated _id.
 */
router.post("/", async (req, res) => {
  try {
    const post = await Post.create(req.body);

    /**
     * CONCEPT: HTTP Status Codes
     * 201 = Created (resource successfully created)
     */
    res.status(201).json(post);
  } catch (err) {
    /**
     * CONCEPT: HTTP Status Codes
     * 400 = Bad Request (validation failed, e.g., required field missing)
     */
    res.status(400).json({
      error: err.message,
    });
  }
});

/**
 * ROUTE: DELETE /api/posts/:id
 * CONCEPT: Route Parameters
 * :id is a URL parameter that captures the post ID (e.g., /api/posts/123 -> id=123).
 * Accessed via req.params.id
 * 
 * CONCEPT: HTTP DELETE Request (Delete)
 * Deletes a single post by its MongoDB ID.
 * 
 * CONCEPT: Mongoose .findByIdAndDelete()
 * Finds a document by ID and removes it from MongoDB in one operation.
 */
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    /**
     * CONCEPT: HTTP Status Codes
     * 404 = Not Found (the post doesn't exist)
     */
    if (!post) {
      return res.status(404).json({
        error: "Not found",
      });
    }

    res.json({
      message: "Post deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;

/**
 * SUMMARY OF CONCEPTS USED:
 * - RESTful API Design (GET for read, POST for create, DELETE for remove)
 * - Async/Await for handling asynchronous database operations
 * - Error Handling with try/catch
 * - HTTP Status Codes for indicating success/failure
 * - Mongoose queries for MongoDB interactions
 */
