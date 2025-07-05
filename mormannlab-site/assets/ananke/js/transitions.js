document.addEventListener('DOMContentLoaded', function () {
  // Add the 'page-transition' class on page load
  document.body.classList.add('page-transition');

  // Select the page content (main content area)
  const pageContent = document.querySelector('.page-content');
  const headerTextContainer = document.querySelector('.header-text-container');

  // Initially, hide the content (optional if content starts with opacity: 0)
  if (pageContent) {
    pageContent.style.opacity = 0;  // Start with content hidden
  }

  // Once the page has loaded, trigger the fade-in and horizontal slide-in effects
  window.addEventListener('load', function () {
    setTimeout(() => {
      document.body.classList.add('loaded');
      
      // Add the 'loaded' class to the header text container for the slide-in effect
      if (headerTextContainer) {
        headerTextContainer.classList.add('loaded');
      }

      // Fade in the page content by adjusting opacity
      if (pageContent) {
        pageContent.style.transition = 'opacity 1s ease';  // Ensure smooth transition
        pageContent.style.opacity = 2;  // Make content visible
      }
    }, 100);  // Optional delay before applying transition
  });
});
