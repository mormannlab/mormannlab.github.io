document.addEventListener('DOMContentLoaded', () => {

  function setupPublicationToggles() {
    const isMobile = window.innerWidth <= 768;

    document.querySelectorAll('.year-toggle').forEach(header => {
      // Remove old click listeners to avoid duplicates
      header.replaceWith(header.cloneNode(true));
    });

    document.querySelectorAll('.year-toggle').forEach(header => {
      header.addEventListener('click', () => {
        const list = header.nextElementSibling;
        if (!list || !list.classList.contains('publication-list')) return;

        // Toggle visibility
        if (list.style.display === 'block') {
          list.style.display = 'none';
        } else {
          list.style.display = 'block';
        }
      });
    });

    // Initial state: collapsed on mobile, visible on desktop
    document.querySelectorAll('.publication-list').forEach(list => {
      list.style.display = isMobile ? 'none' : 'block';
    });
  }

  // Run on load
  setupPublicationToggles();

  // Run on resize
  window.addEventListener('resize', setupPublicationToggles);

});
