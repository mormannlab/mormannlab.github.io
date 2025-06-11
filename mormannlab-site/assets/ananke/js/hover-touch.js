// JavaScript to handle touch events on mobile devices
document.addEventListener('DOMContentLoaded', function() {
  // Select all profile cards
  const profileCards = document.querySelectorAll('.profile-card');

  // Add touchstart event listener for each profile card
  profileCards.forEach(function(card) {
    card.addEventListener('touchstart', function() {
      card.classList.add('touch-active'); // Add class to simulate hover
    });

    // Remove the class when touch ends
    card.addEventListener('touchend', function() {
      card.classList.remove('touch-active'); // Remove class on touch end
    });
  });
});

