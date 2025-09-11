// publication-year-toggle.js

// Keep track of last window width to prevent unnecessary resets
let lastWindowWidth = window.innerWidth;

// Function to handle initial visibility and event listeners
function handlePublicationListVisibility() {
  const isMobile = window.innerWidth <= 768;

  // Only reset lists if window width changed
  if (window.innerWidth !== lastWindowWidth) {
    lastWindowWidth = window.innerWidth;

    document.querySelectorAll('.publication-list').forEach(list => {
      if (isMobile) {
        list.style.display = 'none'; // Hide by default on mobile
      } else {
        list.style.display = 'block'; // Show on desktop
      }
    });
  }

  // Add toggle click listeners
  document.querySelectorAll('.year-toggle').forEach(yearHeader => {
    // Remove any existing listener to prevent duplicates
    yearHeader.removeEventListener('click', togglePublicationList);
    yearHeader.addEventListener('click', togglePublicationList);
  });
}

// Function to toggle a single publication list
function togglePublicationList(event) {
  const publicationList = event.currentTarget.nextElementSibling;
  if (publicationList.style.display === 'none' || publicationList.style.display === '') {
    publicationList.style.display = 'block';
  } else {
    publicationList.style.display = 'none';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', handlePublicationListVisibility);

// Update on window resize (only affects display if width actually changes)
window.addEventListener('resize', handlePublicationListVisibility);
