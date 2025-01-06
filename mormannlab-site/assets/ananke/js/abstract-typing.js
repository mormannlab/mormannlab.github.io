document.addEventListener("DOMContentLoaded", function () {
  const publicationBoxes = document.querySelectorAll(".publication-box");

  publicationBoxes.forEach((box) => {
    const middleSection = box.querySelector(".middle-section");
    const abstractText = box.getAttribute("data-abstract");
    const abstractContainer = middleSection.querySelector(".abstract");
    let typingInterval; // Store the interval ID for each box

    const maxLines = 6; // Maximum number of lines to display
    const lineHeight = 1.5; // Ensure this matches the CSS `line-height` in `em`
    const fontSize = 14; // Font size in pixels
    const maxHeight = maxLines * lineHeight * fontSize; // Calculate maximum height in pixels

    box.addEventListener("mouseenter", () => {
      if (abstractText && abstractContainer) {
        // Clear any existing interval
        clearInterval(typingInterval);

        // Reset text and show the middle section
        abstractContainer.textContent = "";
        middleSection.style.display = "flex";

        // Typing effect with height check
        let i = 0;
        let currentText = "";
        typingInterval = setInterval(() => {
          currentText += abstractText[i] || "";
          abstractContainer.textContent = currentText;

          // Check if the content exceeds the allowed height
          if (abstractContainer.scrollHeight > maxHeight || i >= abstractText.length - 1) {
            clearInterval(typingInterval); // Stop typing
            if (i < abstractText.length - 1) {
              abstractContainer.textContent = currentText.trim() + "..."; // Add ellipsis if truncated
            }
          }
          i++;
        }, 10); // Typing speed
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
