function generateRandomTime() {
  const hours = String(Math.floor(Math.random() * 3)).padStart(2, '0');
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const seconds = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function generateRandomDayData() {
  const totalHoursMs = Math.floor(Math.random() * (24 * 60 * 60 * 1000)); // Random milliseconds within a day
  const totalHours = new Date(totalHoursMs).toISOString().substr(11, 8);

  const sections = [];
  const numSections = Math.floor(Math.random() * 20) + 5; // Random number of sections (5 to 20)

  for (let i = 0; i < numSections; i++) {
    const screenOn = generateRandomTime();
    const screenOff = generateRandomTime();
    const screenOnTime = new Date(`1970-01-01T${screenOn}Z`).getTime();
    const screenOffTime = new Date(`1970-01-01T${screenOff}Z`).getTime();
    const durationMs = screenOffTime - screenOnTime;
    const duration = new Date(durationMs).toISOString().substr(11, 8);

    sections.push({
      screenOn,
      screenOff,
      duration,
    });
  }

  return {
    totalHours,
    totalHoursMs,
    sections,
  };
}

function generateRandomJSON(numDays) {
  const result = {};

  for (let i = 0; i < numDays; i++) {
    const date = `${`${i + 1}`.padStart(2, '0')}/12/2023`;
    result[date] = generateRandomDayData();
  }

  return JSON.stringify(result, null, 2);
}

// Usage example: generate JSON for 30 days
const jsonResult = generateRandomJSON(30);
console.log(jsonResult);