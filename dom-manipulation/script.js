document.addEventListener("DOMContentLoaded", () => {
  // مصفوفة الكوتس
  let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Don’t let yesterday take up too much of today.", category: "Wisdom" },
    { text: "It’s not whether you get knocked down, it’s whether you get up.", category: "Perseverance" }
  ];

  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const addQuoteBtn = document.getElementById("addQuoteBtn");
  const categorySelect = document.getElementById("categorySelect");

  // 🟢 دالة عرض كوت عشوائي
  function showRandomQuote() {
    const selectedCategory = categorySelect.value;
    let filteredQuotes = quotes;

    if (selectedCategory !== "all") {
      filteredQuotes = quotes.filter(q => q.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (filteredQuotes.length === 0) {
      quoteDisplay.textContent = "No quotes available for this category.";
      return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    quoteDisplay.textContent = `"${randomQuote.text}" — [${randomQuote.category}]`;
  }

  // 🟢 دالة إضافة كوت جديدة
  function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const newText = textInput.value.trim();
    const newCategory = categoryInput.value.trim();

    if (newText === "" || newCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
    }

    // ضيف الكوت للمصفوفة
    quotes.push({ text: newText, category: newCategory });

    // لو الكاتيجوري مش موجودة ضيفها للـ dropdown
    if (![...categorySelect.options].some(opt => opt.value.toLowerCase() === newCategory.toLowerCase())) {
      const newOption = document.createElement("option");
      newOption.value = newCategory;
      newOption.textContent = newCategory;
      categorySelect.appendChild(newOption);
    }

    // نظف المدخلات
    textInput.value = "";
    categoryInput.value = "";

    alert("Quote added successfully!");
  }

  // 🟢 روابط الأزرار
  newQuoteBtn.addEventListener("click", showRandomQuote);
  addQuoteBtn.addEventListener("click", addQuote);

  // أول عرض
  showRandomQuote();
});
