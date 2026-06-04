# React Virtual DOM Techniques

Here are the key Virtual DOM techniques in React explained in one easy line:

- **Virtual DOM**: A lightweight, in-memory copy of the real DOM used for fast performance calculations.
- **Reconciliation**: The synchronization process where React updates the real DOM to match the virtual DOM.
- **Diffing Algorithm**: The O(n) heuristic algorithm React uses to compare two virtual DOM trees and find changes.
- **Keys**: Unique attributes used in lists to help React track which items changed, added, or deleted.
- **State Batching**: Grouping multiple state updates together into a single render pass to prevent unnecessary UI redraws.
- **Fiber Architecture**: React's core rendering engine that splits rendering work into small chunks to avoid blocking the main thread.
