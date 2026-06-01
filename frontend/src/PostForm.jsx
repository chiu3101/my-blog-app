import React from "react";

/**
 * CONCEPT: Presentational/Dumb Component
 * PostForm is a "dumb" component that only renders UI and handles user input.
 * It has NO internal state and NO API calls. All state logic is in parent (App.jsx).
 * This makes it reusable and easy to test.
 */
export default function PostForm({
  /**
   * CONCEPT: Props Destructuring
   * Instead of receiving a single 'props' object, we destructure individual properties.
   * Makes code cleaner and shows exactly what data this component needs.
   */
  setTitle,
  author,
  setAuthor,
  content,
  setContent,
  createPost,
}) {
  return (
    <form onSubmit={createPost}>
        {/**
        * CONCEPT: Controlled Components
        * A controlled component's value comes from React state (via props).
        * onChange handler updates the parent's state, which updates the input value.
        * This way React is the "source of truth" for the form data.
        */}
        <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />

      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows={5}
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />

      {/**
        * CONCEPT: Event Handler (onClick/onSubmit)
        * onClick and onSubmit call handler functions passed via props.
        * The handler logic lives in the parent component.
        */}
      <button type="submit">Publish Post</button>
    </form>
  );
}
