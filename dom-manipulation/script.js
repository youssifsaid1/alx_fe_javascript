document.addEventListener("DOMContentLoaded", () => {
  // 🟢 مصفوفة الكوتس
  let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Don’t let yesterday take up too much of today.", category: "Wisdom" },
    { text: "It’s not whether you get knocked down, it’s whether you get up.", category: "Perseverance" }
  ];

  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");

  // 🟢 دالة عرض كوت عشوائي (لازم اسمها displayRandomQuote)
  function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.textContent = `"${randomQuote.text}" — [${randomQuote.category}]`;
  }

  // 🟢 دالة إضافة كوت جديدة (لازم اسمها addQuote)
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

    // نظف المدخلات
    textInput.value = "";
    categoryInput.value = "";

    // تحديث الدوم مباشرةً
    quoteDisplay.textContent = `"${newText}" — [${newCategory}]`;
  }

  // 🟢 اربط زرار Show New Quote
  newQuoteBtn.addEventListener("click", displayRandomQuote);

  // عرض أول كوت عند تحميل الصفحة
  displayRandomQuote();
});
