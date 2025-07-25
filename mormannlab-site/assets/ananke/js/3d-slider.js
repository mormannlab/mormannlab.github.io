document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  if (!slider) {
    console.warn("Slider element not found in DOM.");
    return;
  }

  const cardCount = slider.querySelectorAll(".item").length;
  const stepAngle = 360 / cardCount;
  let currentIndex = 0;
  let lastScrollTime = 0;
  let visitedIndices = new Set();
  let scrollLocked = false;
  let sliderActivated = false;

  // Disable scroll globally
  function preventScroll(e) {
    e.preventDefault();
  }

  // Helper: Check if slider is centered in viewport
  function isSliderCentered() {
    const rect = slider.getBoundingClientRect();
    const sliderCenterY = rect.top + rect.height / 2;
    const viewportCenterY = window.innerHeight / 2;
    return Math.abs(sliderCenterY - viewportCenterY) < 60; // within ±60px of center
  }

  // Scroll-to-rotate logic
  function handleWheel(e) {
    if (!scrollLocked || !isSliderCentered()) return;

    const now = Date.now();
    if (now - lastScrollTime < 400) return;
    lastScrollTime = now;

    const direction = e.deltaY > 0 ? 1 : -1;
    currentIndex = (currentIndex + direction + cardCount) % cardCount;
    visitedIndices.add(currentIndex);

    const rotation = currentIndex * stepAngle;
    slider.style.transform = `perspective(4000px) rotateY(${rotation}deg)`;

    if (visitedIndices.size === cardCount) {
      // All cards seen — unlock scrolling
      scrollLocked = false;
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", preventScroll);
    }
  }

  // Main loop to check for slider centering
  function monitorSliderPosition() {
    if (!sliderActivated && isSliderCentered()) {
      sliderActivated = true;
      scrollLocked = true;
      document.body.style.overflow = "hidden";
      window.addEventListener("wheel", preventScroll, { passive: false });
      console.log("Scroll locked: Slider is now centered.");
    }

    requestAnimationFrame(monitorSliderPosition);
  }

  // Start monitoring when DOM is ready
  requestAnimationFrame(monitorSliderPosition);
  window.addEventListener("wheel", handleWheel, { passive: false });
});
