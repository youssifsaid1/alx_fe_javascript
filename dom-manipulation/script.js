// Array of quotes
let quotes = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Don't let yesterday take up too much of today.",
    author: "Will Rogers"
  },
  {
    text: "It's not whether you get knocked down, it's whether you get up.",
    author: "Vince Lombardi"
  }
];

// DOM elements
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const addQuoteContainer = document.getElementById("add-quote-container");

// Show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteText.textContent = `"${randomQuote.text}"`;
  quoteAuthor.textContent = `- ${randomQuote.author}`;
}

// Create Add Quote form dynamically
function createAddQuoteForm() {
  const form = document.createElement("form");
  form.id = "add-quote-form";

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.placeholder = "Enter quote text";
  textInput.id = "quote-input";
  textInput.required = true;

  const authorInput = document.createElement("input");
  authorInput.type = "text";
  authorInput.placeholder = "Enter author name";
  authorInput.id = "author-input";
  authorInput.required = true;

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Add Quote";

  form.appendChild(textInput);
  form.appendChild(authorInput);
  form.appendChild(submitBtn);

  // Add submit event
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    addQuote(textInput.value, authorInput.value);
    form.reset();
  });

  addQuoteContainer.appendChild(form);
}

// Logic to add a new quote to the array and update DOM
function addQuote(text, author) {
  const newQuote = { text, author };
  quotes.push(newQuote);
  showRandomQuote(); // Show the newly added quote
}

// Event listener for "Show New Quote" button
newQuoteBtn.addEventListener("click", showRandomQuote);

// Initial setup
createAddQuoteForm();
showRandomQuote();
