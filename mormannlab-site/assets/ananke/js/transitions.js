document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('transition-overlay');

  // Initially add page-loaded to allow content to be visible
  document.body.classList.add('page-loaded');

  // Handle internal link navigation
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Trigger the transition effect
      document.body.classList.remove('page-loaded');
      document.body.classList.add('page-transition');

      // Wait for the fade and scale effect to finish before navigating
      setTimeout(() => {
        window.location.href = link.href;
      }, 600); // match transition timing
    });
  });
});
