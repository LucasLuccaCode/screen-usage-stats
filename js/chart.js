let chart;

async function generateCanvasChart() {
  if (chart) {
    chart.destroy();
  }

  const labels = Object.keys(usageData);
  const usageTimes = Object.values(usageData).map(day => calculateTotalHours(day.totalHoursMs));
  const sections = Object.values(usageData).map(day => day.sections.length);

  // Create graph
  const ctx = canvas.getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Used(hours)',
        data: usageTimes,
        backgroundColor: `rgba(${theme["base-rgb-details"]}, 0.6)`,
        borderColor: `rgba(${theme["base-rgb-details"]}, 8)`,
        borderWidth: 1
      },
        {
          label: 'Unlocks',
          data: sections,
          backgroundColor: `rgba(${theme["base-rgb-opaque"]}, 0.6)`,
          borderColor: `rgba(${theme["base-rgb-opaque"]}, .7)`,
          borderWidth: 1
        }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}