document.addEventListener("DOMContentLoaded", () => {
  // 🟢 مصفوفة الكوتس
  let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Don’t let yesterday take up too much of today.", category: "Wisdom" },
    { text: "It’s not whether you get knocked down, it’s whether you get up.", category: "Perseverance" }
  ];

  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");

  // 🟢 لازم تبقى showRandomQuote مش displayRandomQuote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    // لازم innerHTML
    quoteDisplay.innerHTML = `"${randomQuote.text}" — <em>[${randomQuote.category}]</em>`;
  }

  // 🟢 دالة إضافة كوت
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

    // تحديث الدوم مباشرةً باستخدام innerHTML
    quoteDisplay.innerHTML = `"${newText}" — <em>[${newCategory}]</em>`;
  }

  // 🟢 اربط زرار Show New Quote
  newQuoteBtn.addEventListener("click", showRandomQuote);

  // عرض أول كوت عند تحميل الصفحة
  showRandomQuote();
});
