// Quotes array with text and category
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don't let yesterday take up too much of today.", category: "Wisdom" },
  { text: "It's not whether you get knocked down, it's whether you get up.", category: "Perseverance" }
];

// Select DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><small>Category: ${randomQuote.category}</small>`;
}

// Function to add a new quote
function addQuote(text, category) {
  const newQuote = { text, category };
  quotes.push(newQuote);
  showRandomQuote(); // Show new quote after adding
}

// Function to dynamically create Add Quote form
function createAddQuoteForm() {
  const container = document.createElement("div");

  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.id = "newQuoteText";
  inputText.placeholder = "Enter a new quote";

  const inputCategory = document.createElement("input");
  inputCategory.type = "text";
  inputCategory.id = "newQuoteCategory";
  inputCategory.placeholder = "Enter quote category";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Quote";

  // Add event listener to button
  addBtn.addEventListener("click", () => {
    const text = inputText.value.trim();
    const category = inputCategory.value.trim();
    if (text && category) {
      addQuote(text, category);
      inputText.value = "";
      inputCategory.value = "";
    } else {
      alert("Please enter both quote and category!");
    }
  });

  container.appendChild(inputText);
  container.appendChild(inputCategory);
  container.appendChild(addBtn);

  document.body.appendChild(container);
}

// Event listener for "Show New Quote" button
newQuoteBtn.addEventListener("click", showRandomQuote);

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  showRandomQuote();
  createAddQuoteForm();
});
