function updateTimelineColors() {
  const timelineLine = document.querySelector('.timeline-line');
  const timelineRows = document.querySelectorAll('.timeline-row');

  if (!timelineLine) return;

  // Extract the CSS variables for the gradient colors
  const rootStyles = getComputedStyle(document.documentElement); // Get the root styles (CSS variables)
  const startColor = rootStyles.getPropertyValue('--start-color').trim();
  const middleColor = rootStyles.getPropertyValue('--middle-color').trim();
  const endColor = rootStyles.getPropertyValue('--end-color').trim();

  //console.log('Start Color:', startColor);  // Log start color
  //console.log('Middle Color:', middleColor);  // Log middle color
  //console.log('End Color:', endColor);      // Log end color

  // Create a hidden canvas to sample gradient color
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set canvas size to match the height of the timeline line
  const lineRect = timelineLine.getBoundingClientRect();
  canvas.width = 1; // We only need a single vertical pixel
  canvas.height = lineRect.height;

  // Create gradient using the colors extracted from CSS variables
  const gradient = ctx.createLinearGradient(0, 0, 0, lineRect.height);
  gradient.addColorStop(0, startColor);  // Start color from CSS variable
  gradient.addColorStop(0.5, middleColor); // Middle color from CSS variable
  gradient.addColorStop(1, endColor);    // End color from CSS variable

  // Set the gradient to the canvas context
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill with gradient

  // Sample color for each timeline row based on its position
  timelineRows.forEach(row => {
    const rowRect = row.getBoundingClientRect();

    // Calculate the Y position of the row relative to the vertical line
    let yPercent = (rowRect.top + rowRect.height / 2 - lineRect.top) / lineRect.height;
    yPercent = Math.min(Math.max(yPercent, 0), 1); // Clamp between 0 and 1

    // Sample color from the gradient at the Y position
    const color = ctx.getImageData(0, yPercent * canvas.height, 1, 1).data;
    const cssColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`; // Convert to CSS format

    // Apply the computed color to the CSS variable
    row.style.setProperty('--timeline-color', cssColor);
  });
}

// Run once on DOM content loaded
window.addEventListener('DOMContentLoaded', updateTimelineColors);

// Update colors on window resize or scroll (optional)
window.addEventListener('resize', updateTimelineColors);
window.addEventListener('scroll', updateTimelineColors);
