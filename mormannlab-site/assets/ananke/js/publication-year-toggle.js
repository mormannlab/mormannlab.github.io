// publication-year-toggle.js

document.addEventListener('DOMContentLoaded', () => {
  const yearHeaders = document.querySelectorAll('.year-toggle');

  yearHeaders.forEach(header => {
    let touchStartY = 0;
    let touchMoved = false;

    // Handle touch events for mobile
    header.addEventListener('touchstart', e => {
      touchStartY = e.touches[0].clientY;
      touchMoved = false;
    });

    header.addEventListener('touchmove', e => {
      if (Math.abs(e.touches[0].clientY - touchStartY) > 10) {
        touchMoved = true; // User is scrolling, don't toggle
      }
    });

    header.addEventListener('touchend', e => {
      // Only toggle if touch ended on the header itself (not a child)
      if (!touchMoved && e.target === header) {
        toggleList(header);
      }
    });

    // Handle click for desktop
    header.addEventListener('click', e => {
      // Only toggle if click is on the header itself
      if (e.target === header) {
        toggleList(header);
      }
    });
  });

  // Initialize all lists as collapsed on mobile, expanded on desktop
  function handlePublicationListVisibility() {
    const isMobile = window.innerWidth <= 768;
    document.querySelectorAll('.publication-list').forEach(list => {
      if (isMobile) {
        list.style.display = 'none';
        list.setAttribute('data-expanded', false);
      } else {
        list.style.display = 'block';
        list.setAttribute('data-expanded', true);
      }
    });
  }

  // Toggle visibility of the list associated with the header
  function toggleList(header) {
    const list = header.nextElementSibling;
    const expanded = list.getAttribute('data-expanded') === 'true';
    list.style.display = expanded ? 'none' : 'block';
    list.setAttribute('data-expanded', !expanded);
  }

  // Run on load
  handlePublicationListVisibility();

  // Update on window resize
  window.addEventListener('resize', handlePublicationListVisibility);
});
