document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('dn');
      links.classList.toggle('flex');
      links.classList.toggle('flex-column');
      links.classList.toggle('items-center');
      links.classList.toggle('mt3');
    });
  }
});

