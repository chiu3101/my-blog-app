const mongoose = require("mongoose");

/**
 * CONCEPT: MongoDB Schema (Mongoose)
 * A schema defines the structure and validation rules for documents in MongoDB.
 * Each field has a type and optional constraints (required, default, trim).
 * 
 * CONCEPT: Data Validation
 * - required: true = field must be provided when creating a document
 * - default: sets a default value if not provided
 * - trim: true = removes whitespace from strings
 */
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Must provide a title
    trim: true,     // Remove leading/trailing whitespace
  },

  content: {
    type: String,
    required: true, // Must provide content
  },

  author: {
    type: String,
    default: "Anonymous", // If no author provided, default to "Anonymous"
  },

  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to current time when document is created
  },
});

/**
 * CONCEPT: MongoDB Model
 * mongoose.model("Post", postSchema) creates a model based on the schema.
 * The model is used to interact with the "posts" collection in MongoDB.
 * Methods like .create(), .find(), .findByIdAndDelete() are inherited from the model.
 */
const Post = mongoose.model("Post", postSchema);

module.exports = Post;

/**
 * SUMMARY OF CONCEPTS USED:
 * - MongoDB Schema for data structure definition
 * - Data Validation (required, default, trim)
 * - Mongoose ODM for abstracting MongoDB operations
 * - Timestamps for tracking when posts are created
 */
