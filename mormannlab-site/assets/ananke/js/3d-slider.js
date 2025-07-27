document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const items = slider?.querySelectorAll(".item") || [];
  if (!slider || items.length === 0) return;

  const stepAngle = 360 / items.length;
  let currentIndex = 0;
  let snappedThisPass = false;
  let snapping = false;
  let inScrollToRotate = false;
  let lastRotateTime = 0;

  // Prevent scrolling during snapping
  function blockScroll(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }

  function enableScrollBlock() {
    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });
    window.addEventListener("keydown", blockScroll, { passive: false });
    window.addEventListener("scroll", blockScroll, { passive: false });
    window.addEventListener("mousedown", blockScroll, { passive: false });
    window.addEventListener("mouseup", blockScroll, { passive: false });
    document.body.style.overflow = "hidden"; // Full scroll lock
  }

  function disableScrollBlock() {
    window.removeEventListener("wheel", blockScroll);
    window.removeEventListener("touchmove", blockScroll);
    window.removeEventListener("keydown", blockScroll);
    window.removeEventListener("scroll", blockScroll);
    window.removeEventListener("mousedown", blockScroll);
    window.removeEventListener("mouseup", blockScroll);
    document.body.style.overflow = ""; // Restore scroll
  }

  function rotateTo(index) {
    slider.style.transform = `perspective(4000px) rotateY(${index * stepAngle}deg)`;
  }

  function scrollToCenter(el, callback) {
    const rect = el.getBoundingClientRect();
    const elCenter = rect.top + rect.height / 2;
    const winCenter = window.innerHeight / 2;
    const diff = elCenter - winCenter;

    snapping = true;
    enableScrollBlock(); // Block all interactions during snapping

    window.scrollBy({
      top: diff,
      behavior: "smooth",
    });

    setTimeout(() => {
      snapping = false;
      disableScrollBlock(); // Allow interactions again
      snappedThisPass = true;
      inScrollToRotate = true;
      document.body.classList.add("no-scroll");
      slider.classList.add("active-rotate");
      if (callback) callback();
    }, 500); // Adjust if you change scroll speed
  }

  function handleSnapTrigger() {
    if (snapping || snappedThisPass) return;

    const rect = slider.getBoundingClientRect();
    const sliderCenterY = rect.top + rect.height / 2;
    const windowCenterY = window.innerHeight / 2;
    const offsetFromCenter = sliderCenterY - windowCenterY;

    const comingFromTop = rect.top < 0 && rect.bottom > 0; // entering from top
    const comingFromBottom = rect.bottom > window.innerHeight && rect.top < window.innerHeight; // entering from bottom
    const isCentered = Math.abs(offsetFromCenter) < 5;

    if ((comingFromTop || comingFromBottom) && !isCentered) {
      scrollToCenter(slider);
    }
  }

function resetSnapIfSliderIsGone() {
  const rect = slider.getBoundingClientRect();

  const mostlyAbove = rect.bottom < window.innerHeight * 0.25;
  const mostlyBelow = rect.top > window.innerHeight * 0.75;

  if (mostlyAbove || mostlyBelow) {
    snappedThisPass = false;
    inScrollToRotate = false;
    document.body.classList.remove("no-scroll");
    slider.classList.remove("active-rotate");
  }
}


  function exitScrollToRotate(direction) {
    inScrollToRotate = false;
    snapping = true;
    document.body.classList.remove("no-scroll");
    slider.classList.remove("active-rotate");
    enableScrollBlock();

    requestAnimationFrame(() => {
      window.scrollBy({
        top: direction > 0 ? window.innerHeight : -window.innerHeight,
        behavior: "smooth",
      });

      setTimeout(() => {
        snapping = false;
        disableScrollBlock();
      }, 600);
    });
  }

  function handleRotation(e) {
    const delta = e.deltaY;
    const now = Date.now();

    if (now - lastRotateTime < 250) return;
    lastRotateTime = now;

    if (delta > 0 && currentIndex < items.length - 1) {
      currentIndex++;
      rotateTo(currentIndex);
    } else if (delta < 0 && currentIndex > 0) {
      currentIndex--;
      rotateTo(currentIndex);
    } else if (delta > 0 && currentIndex === items.length - 1) {
      exitScrollToRotate(+1);
    } else if (delta < 0 && currentIndex === 0) {
      exitScrollToRotate(-1);
    }

    e.preventDefault();
  }

  window.addEventListener("scroll", () => {
    handleSnapTrigger();
    resetSnapIfSliderIsGone();
  });

  window.addEventListener("wheel", (e) => {
    if (inScrollToRotate && !snapping) {
      handleRotation(e);
    }
  }, { passive: false });
});
