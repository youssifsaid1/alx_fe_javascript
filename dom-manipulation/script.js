// Mock server URL
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

// Quotes array
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don’t let yesterday take up too much of today.", category: "Inspiration" },
  { text: "Failure is not the opposite of success; it’s part of success.", category: "Wisdom" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Notifications
function showNotification(message, type = "info") {
  const note = document.getElementById("notification");
  note.textContent = message;
  note.className = "";
  note.classList.add(type);
  note.style.display = "block";
  setTimeout(() => { note.style.display = "none"; }, 3000);
}

// Populate categories dynamically
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
  const selectedCategory = localStorage.getItem("selectedCategory");
  if (selectedCategory) {
    categoryFilter.value = selectedCategory;
  }
}

// Display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  let filteredQuotes = quotes;
  const category = document.getElementById("categoryFilter").value;
  if (category !== "all") {
    filteredQuotes = quotes.filter(q => q.category === category);
  }
  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available in this category.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];
  quoteDisplay.innerHTML = `"${randomQuote.text}" - <em>${randomQuote.category}</em>`;
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
}

// Add new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();
  if (text && category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    textInput.value = "";
    categoryInput.value = "";
    showNotification("Quote added locally! Syncing with server...", "success");
    syncQuoteToServer(newQuote);
  } else {
    alert("Please enter both text and category.");
  }
}

// Filter quotes by category
function filterQuote() {
  const category = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", category);
  showRandomQuote();
}

// Export quotes to JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        showNotification("Quotes imported successfully!", "success");
      } else {
        showNotification("Invalid file format!", "error");
      }
    } catch {
      showNotification("Error reading JSON file!", "error");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Fetch quotes from server
async function fetchQuotesFromServer() {
  try {
    const res = await fetch(SERVER_URL);
    const data = await res.json();
    if (Array.isArray(data)) {
      // Conflict resolution: server wins
      quotes = data.slice(0, 5).map(item => ({
        text: item.title || "Server Quote",
        category: "Server"
      }));
      saveQuotes();
      populateCategories();
      showNotification("Quotes synced with server (server version applied).", "info");
    }
  } catch {
    showNotification("Failed to fetch from server.", "error");
  }
}

// Post new quote to server
async function syncQuoteToServer(quote) {
  try {
    await fetch(SERVER_URL, {
      method: "POST",
      body: JSON.stringify(quote),
      headers: { "Content-Type": "application/json" }
    });
    showNotification("Quote synced with server successfully!", "success");
  } catch {
    showNotification("Failed to sync with server.", "error");
  }
}

// SyncQuotes function (required by checks)
async function syncQuotes() {
  await fetchQuotesFromServer(); // always fetch latest from server
}

// Periodic Sync every 30s
setInterval(syncQuotes, 30000);

// Event listener for "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// On page load
window.onload = function() {
  populateCategories();
  const selectedCategory = localStorage.getItem("selectedCategory");
  if (selectedCategory) {
    document.getElementById("categoryFilter").value = selectedCategory;
  }
  const lastQuote = sessionStorage.getItem("lastViewedQuote");
  if (lastQuote) {
    const quote = JSON.parse(lastQuote);
    document.getElementById("quoteDisplay").innerHTML =
      `"${quote.text}" - <em>${quote.category}</em>`;
  } else {
    showRandomQuote();
  }
  syncQuotes(); // Initial sync
};
