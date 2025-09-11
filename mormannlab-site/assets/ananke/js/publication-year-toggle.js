// publication-year-toggle.js

document.addEventListener('DOMContentLoaded', () => {
  const yearHeaders = document.querySelectorAll('.year-toggle');
  const publicationLists = document.querySelectorAll('.publication-list');

  // Initialize publication lists for mobile/desktop
  function setInitialState() {
    const isMobile = window.innerWidth <= 768;
    publicationLists.forEach(list => {
      if (isMobile) {
        list.style.display = 'none';
        list.dataset.expanded = 'false';
      } else {
        list.style.display = 'block';
        list.dataset.expanded = 'true';
      }
    });
  }

  setInitialState();

  // Handle window resize
  window.addEventListener('resize', setInitialState);

  // Toggle function
  function togglePublicationList(list) {
    const expanded = list.dataset.expanded === 'true';
    if (expanded) {
      list.style.display = 'none';
      list.dataset.expanded = 'false';
    } else {
      list.style.display = 'block';
      list.dataset.expanded = 'true';
    }
  }

  // Attach both click and touch handlers
  yearHeaders.forEach(header => {
    let startY = 0;

    // Touchstart: record initial Y position
    header.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    });

    // Touchend: check movement threshold to distinguish scroll vs tap
    header.addEventListener('touchend', (e) => {
      const endY = e.changedTouches[0].clientY;
      const delta = Math.abs(endY - startY);
      if (delta < 10) {
        // Treat as tap
        const list = header.nextElementSibling;
        togglePublicationList(list);
      }
    });

    // Click handler (desktop)
    header.addEventListener('click', (e) => {
      const list = header.nextElementSibling;
      togglePublicationList(list);
    });
  });
});
