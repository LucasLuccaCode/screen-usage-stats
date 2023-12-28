function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatTimeFromMs(durationMs) {
  // HH:mm:s
  return new Date(durationMs).toISOString().substring(11, 19);
}

function formatDateFromMs(timeMs, langCode) {
  return new Date(timeMs).toLocaleDateString(langCode);
}

function calculateTotalHours(totalHoursMs) {
  const hours = formatTimeFromMs(totalHoursMs)
  const formattedHours = hours.replace(":", ".").substring(0, 5)
  const totalHours = Math.max(formattedHours, 1);
  return totalHours;
}

async function updateGreeting() {
  const currentHour = new Date().getHours();

  let greetingText,
  emoji;

  if (currentHour >= 5 && currentHour < 12) {
    greetingText = "Bom dia!";
    emoji = "☀️";
  } else if (currentHour >= 12 && currentHour < 18) {
    greetingText = "Boa tarde!";
    emoji = "🌤️";
  } else {
    greetingText = "Boa noite!";
    emoji = "🌙";
  }

  greeting.textContent = `${emoji} ${greetingText}`;
}