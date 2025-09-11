// publication-year-toggle.js

function handlePublicationListVisibility() {
  const isMobile = window.innerWidth <= 768;

  // Show all on desktop, hide all on mobile initially
  document.querySelectorAll('.publication-list').forEach(list => {
    list.dataset.expanded = isMobile ? 'false' : 'true';
    list.style.display = isMobile ? 'none' : 'block';
  });

  // Add event listeners for toggling
  document.querySelectorAll('.year-toggle').forEach(yearHeader => {
    yearHeader.removeEventListener('click', togglePublicationListWithTouchCheck);

    // Always use click for simplicity
    yearHeader.addEventListener('click', togglePublicationListWithTouchCheck);

    // Mobile: track touch movements to prevent accidental toggles
    if (isMobile) {
      let startY = 0;
      yearHeader.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
      });

      yearHeader.addEventListener('touchend', (e) => {
        const endY = e.changedTouches[0].clientY;
        const diff = Math.abs(endY - startY);
        if (diff < 10) { // treat as tap only if finger didn't move much
          togglePublicationListWithTouchCheck({ currentTarget: yearHeader });
        }
      });
    }
  });
}

function togglePublicationListWithTouchCheck(event) {
  const publicationList = event.currentTarget.nextElementSibling;
  if (!publicationList) return;

  const expanded = publicationList.dataset.expanded === 'true';
  publicationList.style.display = expanded ? 'none' : 'block';
  publicationList.dataset.expanded = expanded ? 'false' : 'true';
}

// Run on page load
document.addEventListener('DOMContentLoaded', handlePublicationListVisibility);

// Run on window resize
window.addEventListener('resize', handlePublicationListVisibility);
