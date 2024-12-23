document.addEventListener("DOMContentLoaded", function () {
  const publicationBoxes = document.querySelectorAll(".publication-box");

  publicationBoxes.forEach((box) => {
    const middleSection = box.querySelector(".middle-section");
    const abstractText = box.getAttribute("data-abstract");
    const abstractContainer = middleSection.querySelector(".abstract");
    let typingInterval; // Store the interval ID for each box

    box.addEventListener("mouseenter", () => {
      if (abstractText && abstractContainer) {
        // Clear any existing interval
        clearInterval(typingInterval);

        // Reset text and show the middle section
        abstractContainer.textContent = "";
        middleSection.style.display = "flex";

        // Typing effect
        let i = 0;
        typingInterval = setInterval(() => {
          abstractContainer.textContent += abstractText[i];
          i++;
          if (i >= abstractText.length) {
            clearInterval(typingInterval); // Clear interval once text is fully typed
          }
        }, 50); // Typing speed
      }
    });

    box.addEventListener("mouseleave", () => {
      // Clear the interval and reset text
      clearInterval(typingInterval);
      if (abstractContainer) {
        abstractContainer.textContent = "";
      }
      middleSection.style.display = "none";
    });
  });
});
