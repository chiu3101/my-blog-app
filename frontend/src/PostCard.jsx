import React from "react";

/**
 * CONCEPT: Reusable Presentation Component
 * PostCard is a small, reusable component that displays a single post.
 * It receives the post data and a delete handler via props.
 * Can be used anywhere we need to display a post (list, search results, etc.).
 */
export default function PostCard({ post, deletePost }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 16, marginTop: 16 }}>
      <h2>{post.title}</h2>

      <p>{post.content}</p>

      <small>By {post.author}</small>

      <br />

      <button
        onClick={() => deletePost(post._id)}
        style={{ color: "red", marginTop: 10 }}
      >
        {/**
          * CONCEPT: Arrow Function in onClick
          * onClick={() => deletePost(post._id)} passes the post ID to the handler.
          * Without the arrow function, deletePost would be called immediately instead of on click.
          */}
        Delete
      </button>
    </div>
  );
}
