import React, { useState } from "react";

/**
 * React Virtual DOM Techniques Explanation Demo
 */
export default function VirtualDOMExplanation() {
  // State: Changing state triggers React to create a new Virtual DOM tree representing the updated UI.
  const [items, setItems] = useState(["Concept 1", "Concept 2"]);

  const addItem = () => {
    // Batching: React groups multiple state updates into a single re-render to maximize performance.
    setItems([...items, `Concept ${items.length + 1}`]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>React Virtual DOM</h1>
      <button onClick={addItem}>Add Concept</button>

      <ul>
        {items.map((item, index) => (
          // Keys: Unique keys help React identify which items have changed, been added, or been removed.
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* 
        Virtual DOM: A lightweight in-memory representation of the real DOM.
        Diffing Algorithm: React compares the new Virtual DOM tree with the old one to find exact changes.
        Reconciliation: React updates only the changed parts in the real DOM instead of rebuilding the entire tree.
        Fiber: React's rendering engine that splits rendering work into chunks to keep the browser responsive.
      */}
    </div>
  );
}
