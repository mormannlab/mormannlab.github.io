document.addEventListener("DOMContentLoaded", () => {
  function getDayCountMap(container, year) {
    const counts = {};
    container.querySelectorAll("li[data-date]").forEach(li => {
      const dateStr = li.getAttribute("data-date");
      const d = new Date(dateStr);
      if (d.getFullYear() !== parseInt(year)) return;
      const key = d.toISOString().split("T")[0];
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }

  function renderCalendar(container, year, counts) {
    const calendarEl = document.getElementById(`calendar-heatmap-${year}`);
    if (!calendarEl) return;

    const monthNames = Array.from({ length: 12 }, (_, i) =>
      new Date(year, i, 1).toLocaleString('default', { month: 'long' })
    );

    for (let m = 0; m < 12; m++) {
      const monthEl = document.createElement("div");
      monthEl.className = "calendar-month";

      const label = document.createElement("div");
      label.className = "calendar-month-name";
      label.textContent = monthNames[m];
      monthEl.appendChild(label);

      const grid = document.createElement("div");
      grid.className = "calendar-grid";

      const firstDay = new Date(year, m, 1).getDay();
      const daysInMonth = new Date(year, m + 1, 0).getDate();

      // Fill blanks before the 1st
      for (let i = 0; i < firstDay; i++) {
        const blank = document.createElement("div");
        blank.className = "calendar-day inactive";
        grid.appendChild(blank);
      }

      // Fill actual days
      for (let d = 1; d <= daysInMonth; d++) {
        const cell = document.createElement("div");
        cell.className = "calendar-day";
        const key = `${year}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const count = counts[key] || 0;

        if (count > 0) {
          cell.dataset.count = Math.min(count, 4);
        }

        cell.textContent = d.toString().padStart(2, "0");
        grid.appendChild(cell);
      }

      monthEl.appendChild(grid);
      calendarEl.appendChild(monthEl);
    }
  }

  document.querySelectorAll(".calendar-heatmap").forEach(div => {
    const year = div.id.split("-").pop();
    const parent = div.closest(".timeline-box");
    if (!parent) return;

    const counts = getDayCountMap(parent, year);
    renderCalendar(parent, year, counts);
  });
});

