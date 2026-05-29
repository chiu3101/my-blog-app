import { useState, useEffect } from "react";

const API = "http://localhost:5000/api/posts";

export default function App() {
  const [posts, setPosts] = useState([]);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [author, setAuthor] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // FETCH POSTS
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

  // CREATE POST
  async function createPost(e) {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const res = await fetch(API, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,
          content,
          author,
        }),
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

  // DELETE POST
  async function deletePost(id) {
    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

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

      <form onSubmit={createPost}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{
            display: "block",
            width: "100%",
            marginBottom: 10,
          }}
        />

        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          style={{
            display: "block",
            width: "100%",
            marginBottom: 10,
          }}
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={5}
          style={{
            display: "block",
            width: "100%",
            marginBottom: 10,
          }}
        />

        <button type="submit">Publish Post</button>
      </form>

      {loading && <p>Loading...</p>}

      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            border: "1px solid #ccc",
            padding: 16,
            marginTop: 16,
          }}
        >
          <h2>{post.title}</h2>

          <p>{post.content}</p>

          <small>By {post.author}</small>

          <br />

          <button
            onClick={() => deletePost(post._id)}
            style={{
              color: "red",
              marginTop: 10,
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
