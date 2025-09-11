// publication-year-toggle.js

function handlePublicationListVisibility() {
  const isMobile = window.innerWidth <= 768;

  // Set initial collapsed/expanded state
  document.querySelectorAll('.publication-list').forEach(list => {
    list.style.display = isMobile ? 'none' : 'block';
  });

  // Attach click listeners for toggling
  document.querySelectorAll('.year-toggle').forEach(header => {
    // Remove old listeners safely
    header.removeEventListener('click', togglePublicationList);
    header.removeEventListener('touchstart', togglePublicationList);

    // Add new listener for click
    header.addEventListener('click', togglePublicationList);

    // Optional: prevent toggle on swipe
    header.addEventListener('touchstart', function(e) {
      // Store initial touch position
      this._touchStartY = e.touches[0].clientY;
    });

    header.addEventListener('touchend', function(e) {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = Math.abs(touchEndY - this._touchStartY);

      // If finger didn’t move much, treat as tap
      if (diff < 10) {
        togglePublicationList.call(this, e);
      }
    });
  });
}

function togglePublicationList(event) {
  const list = event.currentTarget.nextElementSibling;

  if (!list || !list.classList.contains('publication-list')) return;

  // Only toggle via tap/click
  list.style.display = list.style.display === 'block' ? 'none' : 'block';
}

// Run on page load
document.addEventListener('DOMContentLoaded', handlePublicationListVisibility);

// Run on resize to maintain desktop/mobile behavior
window.addEventListener('resize', handlePublicationListVisibility);
