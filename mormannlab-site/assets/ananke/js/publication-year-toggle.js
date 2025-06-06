// publication-year-toggle.js

// Function to handle the toggle behavior based on screen size
function handlePublicationListVisibility() {
  const isMobile = window.innerWidth <= 768;
  
  // If on mobile, hide all publication lists initially
  document.querySelectorAll('.publication-list').forEach(function(list) {
    if (isMobile) {
      list.style.display = 'none'; // Hide publication lists on mobile
    } else {
      list.style.display = 'block'; // Show publication lists on desktop
    }
  });

  // Add event listeners for toggling visibility
  document.querySelectorAll('.year-toggle').forEach(function(yearHeader) {
    // Reset event listener every time window is resized
    yearHeader.removeEventListener('click', togglePublicationList);

    // Add event listener for toggling visibility based on current view
    yearHeader.addEventListener('click', togglePublicationList);
  });
}

// Function to toggle the visibility of the publication list
function togglePublicationList(event) {
  const publicationList = event.target.nextElementSibling;
  
  // Toggle visibility: show if hidden, hide if visible
  if (publicationList.style.display === 'none' || publicationList.style.display === '') {
    publicationList.style.display = 'block';
  } else {
    publicationList.style.display = 'none';
  }
}

// Run the function to handle visibility when the page loads
document.addEventListener('DOMContentLoaded', handlePublicationListVisibility);

// Listen for window resize events to apply the correct visibility behavior
window.addEventListener('resize', handlePublicationListVisibility);

