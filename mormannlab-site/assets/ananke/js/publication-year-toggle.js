// publication-year-toggle.js
document.addEventListener('DOMContentLoaded', () => {
  const yearHeaders = document.querySelectorAll('.year-toggle');

  yearHeaders.forEach(header => {
    let touchStartY = 0;
    let touchMoved = false;

    // Touch start
    header.addEventListener('touchstart', e => {
      if (e.touches.length > 1) return;
      touchStartY = e.touches[0].clientY;
      touchMoved = false;
    }, { passive: true });

    // Track touch movement
    header.addEventListener('touchmove', e => {
      if (e.touches.length > 1) return;
      if (Math.abs(e.touches[0].clientY - touchStartY) > 10) {
        touchMoved = true; // scrolling detected
      }
    }, { passive: true });

    // Touch end
    header.addEventListener('touchend', e => {
      if (!touchMoved) toggleExclusiveList(header);
    });

    // Desktop click
    header.addEventListener('click', () => toggleExclusiveList(header));
  });

  // Initialize lists collapsed on mobile
  function handlePublicationListVisibility() {
    const isMobile = window.innerWidth <= 768;
    document.querySelectorAll('.publication-list').forEach(list => {
      if (isMobile) {
        list.style.display = 'none';
        list.dataset.expanded = 'false';
      } else {
        list.style.display = 'block';
        list.dataset.expanded = 'true';
      }
    });
  }

  // Toggle clicked list and collapse all others
  function toggleExclusiveList(header) {
    const allLists = document.querySelectorAll('.publication-list');
    const list = header.nextElementSibling;
    const expanded = list.dataset.expanded === 'true';

    allLists.forEach(l => {
      l.style.display = 'none';
      l.dataset.expanded = 'false';
    });

    // If the clicked list was previously collapsed, expand it
    if (!expanded) {
      list.style.display = 'block';
      list.dataset.expanded = 'true';
    }
  }

  // Run on load
  handlePublicationListVisibility();

  // Update on resize
  window.addEventListener('resize', handlePublicationListVisibility);
});
