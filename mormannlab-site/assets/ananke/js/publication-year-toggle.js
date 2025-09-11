// publication-year-toggle.js

document.addEventListener('DOMContentLoaded', () => {
  const yearHeaders = document.querySelectorAll('.year-toggle');

  // Function to check if we are on mobile
  const isMobile = () => window.innerWidth <= 768;

  // Initially set visibility of publication lists
  const setInitialVisibility = () => {
    document.querySelectorAll('.publication-list').forEach(list => {
      if (isMobile()) {
        list.style.display = 'none'; // collapsed by default on mobile
      } else {
        list.style.display = 'block'; // always visible on desktop
      }
    });
  };

  setInitialVisibility();

  // Toggle function: expand/collapse the corresponding list
  const toggleList = (event) => {
    const publicationList = event.currentTarget.nextElementSibling;
    if (!publicationList) return;

    if (publicationList.style.display === 'none' || publicationList.style.display === '') {
      publicationList.style.display = 'block';
    } else {
      publicationList.style.display = 'none';
    }
  };

  // Attach click listeners to each year header
  yearHeaders.forEach(header => {
    header.removeEventListener('click', toggleList); // remove old listener just in case
    header.addEventListener('click', toggleList);
  });

  // Handle window resize to update visibility
  window.addEventListener('resize', setInitialVisibility);
});
