// publication-year-toggle.js

function handlePublicationListVisibility() {
  const isMobile = window.innerWidth <= 768;

  document.querySelectorAll('.publication-list').forEach(list => {
    list.style.display = isMobile ? 'none' : 'block';
  });

  document.querySelectorAll('.year-toggle').forEach(header => {
    // Remove old listeners
    header.removeEventListener('click', togglePublicationList);
    header.removeEventListener('touchend', togglePublicationList);

    if (isMobile) {
      // Only attach touchend for tap
      header.addEventListener('touchend', function(e) {
        e.preventDefault();  // Prevent accidental click events or scrolling interference
        togglePublicationList({ target: header });
      });
    } else {
      // Desktop: normal click
      header.addEventListener('click', togglePublicationList);
    }
  });
}

// Simple toggle
function togglePublicationList(event) {
  const publicationList = event.target.nextElementSibling;
  if (!publicationList) return;

  if (publicationList.style.display === 'none' || publicationList.style.display === '') {
    publicationList.style.display = 'block';
  } else {
    publicationList.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', handlePublicationListVisibility);
window.addEventListener('resize', handlePublicationListVisibility);
