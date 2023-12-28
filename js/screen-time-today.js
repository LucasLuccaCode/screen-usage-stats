function compareAndSplitTimestamps(screenOnMs, screenOffMs, langCode) {
  const screenOnDate = formatDateFromMs(screenOnMs, langCode);
  const screenOffDate = formatDateFromMs(screenOffMs, langCode);

  if (screenOnDate !== screenOffDate) {
    const midnightMs = new Date(screenOnMs).setHours(24, 0, 0, 0);
    const firstPartDurationMs = midnightMs - screenOnMs;
    const secondPartDurationMs = screenOffMs - midnightMs;

    return [firstPartDurationMs,
      secondPartDurationMs];
  } else {
    return [screenOffMs - screenOnMs];
  }
}

function extractTimeData() {
  const {
    screenOnMs,
    screenOffMs,
    currentDate
  } = environment.timeToday;
  const languageCode = settings.languageCode;

  return {
    screenOnMs,
    screenOffMs,
    languageCode
  };
}

function splitTimestamps(screenOnMs, screenOffMs, languageCode) {
  return compareAndSplitTimestamps(screenOnMs, screenOffMs, languageCode);
}

function createDatesData(screenOnDate, screenOffDate, firstPartDurationMs, secondPartDurationMs) {
  let datesData = [];

  if (secondPartDurationMs) {
    datesData = [{
      date: screenOnDate,
      durationMs: firstPartDurationMs
    },
      {
        date: screenOffDate,
        durationMs: secondPartDurationMs
      }];
  } else {
    datesData = [{
      date: screenOnDate,
      durationMs: firstPartDurationMs
    }];
  }

  return datesData
}

function updateTotalHours(datesData) {
  let totalHoursMs,
  totalHours;

  datesData.forEach(({
    date, durationMs
  }) => {
    const dayData = usageData[date];

    if (dayData) {
      totalHoursMs = dayData.totalHoursMs + durationMs;
      totalHours = formatTimeFromMs(totalHoursMs);
    } else {
      totalHours = formatTimeFromMs(durationMs);
    }
  });

  timeToday.textContent = totalHours;
  return totalHoursMs;
}

function setClassBasedOnHours(totalHoursMs) {
  const shortLimit = 3 // 3 hours
  const normalLimit = 6 // 6 hours
  const hoursUsed = formatTimeFromMs(totalHoursMs)
    .split(":")[0]

  let className = "short";
  if (hoursUsed < shortLimit) {
    className = "short"; // Short time
  } else if (hoursUsed < normalLimit) {
    className = "normal"; // Normal time
  } else {
    className = "excessive"; // Excessive time
  }

  timeToday.classList.add(className);
}

async function updateTimeUsedToday() {
  const {
    screenOnMs,
    screenOffMs,
    languageCode
  } = extractTimeData();

  const [firstPartDurationMs,
    secondPartDurationMs] = splitTimestamps(screenOnMs, screenOffMs, languageCode);

  const screenOnDate = formatDateFromMs(screenOnMs, languageCode);
  const screenOffDate = formatDateFromMs(screenOffMs, languageCode);

  const datesData = createDatesData(screenOnDate, screenOffDate, firstPartDurationMs, secondPartDurationMs);

  const totalHoursMs = updateTotalHours(datesData);

  setClassBasedOnHours(totalHoursMs);
}