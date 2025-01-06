document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.getElementById("backToTop");

  // Show or hide the button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
      backToTopButton.classList.remove("hide");
    } else {
      backToTopButton.classList.add("hide");
      backToTopButton.classList.remove("show");
    }
  });

  // Scroll to the top of the page when the button is clicked
  window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
});

