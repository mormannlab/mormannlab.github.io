document.addEventListener("DOMContentLoaded", () => {
  const quoteBlock = document.querySelector(".scroll-reveal-quote");
  const questionText = document.querySelector(".quote-question");

  if (!quoteBlock || !questionText) return;

  function isAboveOrAtCenter(el) {
    const rect = el.getBoundingClientRect();
    const elemCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;

    return elemCenter <= viewportCenter;
  }

  function handleScroll() {
    if (isAboveOrAtCenter(questionText)) {
      quoteBlock.classList.add("revealed");
    } else {
      quoteBlock.classList.remove("revealed");
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

