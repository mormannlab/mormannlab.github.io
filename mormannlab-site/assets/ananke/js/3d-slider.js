document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");

  let isDragging = false;
  let startX = 0;
  let rotation = 0;
  let lastRotation = 0;
  let autoRotateId = null;
  let isHovered = false;

  // Auto-rotate loop
  function autoRotate() {
    if (!isDragging && !isHovered) {
      rotation += 0.2;
      slider.style.transform = `perspective(1500px) rotateY(${rotation}deg)`;
    }
    autoRotateId = requestAnimationFrame(autoRotate);
  }

  // Hover events
  slider.addEventListener("mouseenter", () => {
    isHovered = true;
  });
  slider.addEventListener("mouseleave", () => {
    isHovered = false;
  });

  // Drag logic
  slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    slider.classList.add("dragging");
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    rotation = lastRotation + delta * 0.5;
    slider.style.transform = `perspective(1500px) rotateY(${rotation}deg)`;
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    lastRotation = rotation;
    slider.classList.remove("dragging");
  });

  // Start auto rotation
  autoRotate();
});
