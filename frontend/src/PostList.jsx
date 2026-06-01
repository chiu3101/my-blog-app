import React from "react";
import PostCard from "./PostCard";

/**
 * CONCEPT: Container/List Component
 * PostList receives a list of posts and renders them using .map().
 * 
 * CONCEPT: Array.map() for Rendering Lists
 * .map() transforms each post object into a JSX element (PostCard component).
 * Each item MUST have a unique 'key' prop for React to track which items changed.
 */
export default function PostList({ posts, deletePost }) {
  return (
    <>
      {/**
        * CONCEPT: List Rendering with .map()
        * Loops through each post in the array and renders a PostCard for each.
        * key={post._id} helps React identify which items have changed/been added/removed.
        * deletePost is passed down as a prop to PostCard.
        */}
      {posts.map((post) => (
        <PostCard key={post._id} post={post} deletePost={deletePost} />
      ))}
    </>
  );
}
