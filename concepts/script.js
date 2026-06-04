// DOM Selection: Finding elements in the HTML document using their ID attributes.
const title = document.getElementById("main-title");
const description = document.getElementById("description");
const button = document.getElementById("action-btn");
const dynamicList = document.getElementById("dynamic-list");

// Event Listening: Waiting for a user action (like a click) to trigger a specific function.
button.addEventListener("click", () => {
    
    // Content Modification: Changing the visible text inside an element using innerText.
    title.innerText = "DOM Updated!";
    
    // Style Modification: Direct styling of elements via Javascript using the style property.
    description.style.color = "#28a745";
    
    // Element Creation: Generating a brand new HTML tag inside memory using createElement.
    const newItem = document.createElement("div");
    
    // Class Addition: Adding styling classes dynamically using the classList.add method.
    newItem.classList.add("item");
    
    // Text Injection: Setting the text contents for the newly created element.
    newItem.innerText = "New dynamic item added at " + new Date().toLocaleTimeString();
    
    // DOM Appending: Inserting the newly created element into an existing container in the document.
    dynamicList.appendChild(newItem);
});
