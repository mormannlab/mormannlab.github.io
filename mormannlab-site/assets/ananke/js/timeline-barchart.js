document.addEventListener("DOMContentLoaded", () => {
  function getMonthlyCounts(container, year) {
    const counts = new Array(12).fill(0);

    container.querySelectorAll("li[data-date]").forEach(li => {
      const dateStr = li.getAttribute("data-date");
      const d = new Date(dateStr);
      if (d.getFullYear().toString() !== year) return;
      counts[d.getMonth()]++;
    });

    return counts;
  }

  function renderBarChart(container, year, monthlyCounts) {
    const chart = container.querySelector(`#barchart-${year}`);
    if (!chart) return;

    const max = Math.max(...monthlyCounts, 1); // prevent div by zero

    monthlyCounts.forEach((count, monthIdx) => {
      const bar = document.createElement("div");
      bar.className = "barchart-bar" + (count === 0 ? " zero" : "");
      const height = (count / max) * 70; // scale to max 70px
      bar.style.height = `${height}px`;
      bar.title = `${new Date(0, monthIdx).toLocaleString('default', { month: 'short' })}: ${count}`;
      if (count > 0) bar.textContent = count;
      chart.appendChild(bar);
    });
  }

  document.querySelectorAll(".timeline-box").forEach(box => {
    const yearMatch = box.innerHTML.match(/barchart-(\d{4})/);
    if (!yearMatch) return;

    const year = yearMatch[1];
    const counts = getMonthlyCounts(box, year);
    renderBarChart(box, year, counts);
  });
});

