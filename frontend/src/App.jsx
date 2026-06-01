import { useState, useEffect } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";

/**
 * CONCEPT: Component Composition & State Management
 * App.jsx is the parent/container component that manages all state and API logic.
 * Child components (PostForm, PostList) are presentational and receive data via props.
 */

const API = "http://localhost:5000/api/posts";

export default function App() {
  /**
   * CONCEPT: React State (useState hook)
   * useState creates reactive state variables that trigger re-renders when updated.
   * Each state holds a piece of UI data that can change over time.
   */
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * CONCEPT: useEffect Hook & Side Effects
   * useEffect runs code after component renders. The empty dependency array [] means it runs ONCE on mount.
   * Used here to fetch initial data from the API when the component loads.
   * 
   * CONCEPT: Async/Await & API Calls
   * fetch() is used to make HTTP GET request to backend.
   * Try/catch handles success and error states.
   * finally always runs, used to set loading=false after fetch completes.
   */
  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch(API);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  /**
   * CONCEPT: Event Handlers & Form Submission
   * e.preventDefault() stops the default form reload behavior.
   * 
   * CONCEPT: HTTP POST Request (Create)
   * Sends JSON data to the backend API to create a new post.
   * Method: POST, Headers specify JSON content, body contains the post data.
   * 
   * CONCEPT: State Update & Immutability
   * setPosts([newPost, ...posts]) creates a NEW array (doesn't mutate the old one).
   * The spread operator (...posts) copies existing posts and adds newPost at the beginning.
   */
  async function createPost(e) {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, author }),
      });

      const newPost = await res.json();

      setPosts([newPost, ...posts]);

      setTitle("");
      setContent("");
      setAuthor("");
    } catch (err) {
      setError("Failed to create post");
    }
  }

  /**
   * CONCEPT: HTTP DELETE Request (Delete)
   * Makes a DELETE request to remove a post by ID from the backend.
   * 
   * CONCEPT: Array.filter() for State Updates
   * filter() creates a NEW array with only posts that don't match the deleted ID.
   * This is how we remove items from state without mutating the original array.
   */
  async function deletePost(id) {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      setError("Failed to delete post");
    }
  }

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "2rem auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>My Blog App</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/**
        * CONCEPT: Props Drilling
        * Parent (App) passes state values and setter functions to child (PostForm).
        * Child components don't manage state; they receive it from parent and call handlers.
        */}
      <PostForm
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        content={content}
        setContent={setContent}
        createPost={createPost}
      />

      {/**
        * CONCEPT: Conditional Rendering (Ternary Operator)
        * Shows "Loading..." while loading=true, otherwise shows PostList with posts data.
        */}
      {loading ? <p>Loading...</p> : <PostList posts={posts} deletePost={deletePost} />}
    </div>
  );
}
