// publication-year-toggle.js
document.addEventListener('DOMContentLoaded', () => {
  const yearHeaders = document.querySelectorAll('.year-toggle');

  yearHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const list = header.nextElementSibling;
      list.classList.toggle('expanded');
    });
  });
});
