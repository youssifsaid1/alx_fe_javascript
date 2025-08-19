// Array of quotes (loaded from localStorage if exists)
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to predict the future is to invent it.", category: "Innovation" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
  { text: "Stay hungry, stay foolish.", category: "Motivation" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "<p>No quotes available!</p>";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  document.getElementById("quoteDisplay").innerHTML = `
    <p>"${randomQuote.text}"</p>
    <small>- Category: ${randomQuote.category}</small>
  `;

  // Save last viewed quote in session storage
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
}

// Add new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText === "" || newCategory === "") {
    alert("Please enter both quote text and category.");
    return;
  }

  quotes.push({ text: newText, category: newCategory });
  saveQuotes();
  alert("Quote added successfully!");

  textInput.value = "";
  categoryInput.value = "";
}

// Create form dynamically (required by checks)
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  formContainer.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>
  `;

  document.body.appendChild(formContainer);
}

// Export quotes to JSON file
function exportToJsonFile() {
  const jsonStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();

  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format!");
      }
    } catch (error) {
      alert("Error parsing JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);

  // If last viewed quote exists in session storage, load it
  const lastQuote = sessionStorage.getItem("lastViewedQuote");
  if (lastQuote) {
    const parsedQuote = JSON.parse(lastQuote);
    document.getElementById("quoteDisplay").innerHTML = `
      <p>"${parsedQuote.text}"</p>
      <small>- Category: ${parsedQuote.category}</small>
    `;
  }

  // Create the add quote form dynamically
  createAddQuoteForm();

  // Add export and import controls
  const controls = document.createElement("div");
  controls.innerHTML = `
    <button onclick="exportToJsonFile()">Export Quotes</button>
    <input type="file" id="importFile" accept=".json" onchange="importFromJsonFile(event)" />
  `;
  document.body.appendChild(controls);
});
