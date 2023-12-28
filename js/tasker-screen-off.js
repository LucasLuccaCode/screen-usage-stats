const usage_data = `{
"27/12/2023": {
"totalHours": "09:01:12",
"totalHoursMs": 32472625,
"sections": [{
"screenOn": "12:14:17",
"screenOff": "13:10:59",
"duration": "00:56:42"
},
{
"screenOn": "11:31:59",
"screenOff": "12:11:47",
"duration": "00:39:48"
}]
}
}`;

const screen_on_ms = 1703723400000; // 21:30
// const screen_off_ms = 1703730600000; // 23:30
const screen_off_ms = 1703733900000; // next day 00:25
const my_lang_code = "pt";

// Codigo da tarefa do tasker "SUS - SCREEN OFF"

let usageData = JSON.parse(usage_data);

const screenOnTimestamp = parseInt(screen_on_ms)
const screenOffTimestamp = parseInt(screen_off_ms)
const languageCode = my_lang_code;

var total_hours = "00:00:00"; 
var total_unlocks = 0

function calculateDurationMs(screenOnMs, screenOffMs) {
  return screenOffMs - screenOnMs;
}

function formatTimeFromMs(timeMs, langCode) {
  return new Date(timeMs).toLocaleTimeString(langCode);
}

function formatDateFromMs(timeMs, langCode) {
  return new Date(timeMs).toLocaleDateString(langCode);
}

function formatDurationFromMs(durationMs) {
  return new Date(durationMs).toISOString().substring(11, 19);
}

function compareAndSplitTimestamps(screenOnMs, screenOffMs, langCode) {
  const screenOnDate = formatDateFromMs(screenOnMs, langCode);
  const screenOffDate = formatDateFromMs(screenOffMs, langCode);

  if (screenOnDate !== screenOffDate) {
    const midnightMs = new Date(screenOnMs).setHours(24, 0, 0, 0);
    const firstPartDurationMs = midnightMs - screenOnMs;
    const secondPartDurationMs = screenOffMs - midnightMs;

    return [firstPartDurationMs, secondPartDurationMs, midnightMs];
  } else {
    return [screenOffMs - screenOnMs];
  }
}

function createDatesDataArray(screenOnDate, screenOffDate, firstPartDurationMs, secondPartDurationMs, screenOnMs, midnightMs, screenOffMs) {
  let datesData = [];

  if (secondPartDurationMs) {
    datesData = [
      {
        date: screenOnDate,
        durationMs: firstPartDurationMs,
        screenOnMs: screenOnMs,
        screenOffMs: midnightMs,
      },
      {
        date: screenOffDate,
        durationMs: secondPartDurationMs,
        screenOnMs: midnightMs,
        screenOffMs: screenOffMs,
      },
    ];
  } else {
    datesData = [
      {
        date: screenOnDate,
        durationMs: firstPartDurationMs,
        screenOnMs: screenOnMs,
        screenOffMs: screenOffMs,
      },
    ];
  }

  return datesData;
}

function updateDataForDate(data, date, durationMs, screenOnMs, screenOffMs, langCode) {
  const dayData = data[date];
  
  if (dayData) {
    const totalMs = dayData.totalHoursMs + durationMs;
    dayData.totalHoursMs = totalMs;
    dayData.totalHours = formatDurationFromMs(totalMs);

    dayData.sections.unshift({
      screenOn: formatTimeFromMs(screenOnMs, langCode),
      screenOff: formatTimeFromMs(screenOffMs, langCode),
      duration: formatDurationFromMs(durationMs),
    });
  } else {
    data[date] = {
      totalHours: formatDurationFromMs(durationMs),
      totalHoursMs: durationMs,
      sections: [
        {
          screenOn: formatTimeFromMs(screenOnMs, langCode),
          screenOff: formatTimeFromMs(screenOffMs, langCode),
          duration: formatDurationFromMs(durationMs),
        },
      ],
    };
  }
  
  total_hours = data[date].totalHours;
  total_unlocks = data[date].sections.length;
}

function updateDataWithDuration(data, screenOnMs, screenOffMs, langCode) {
  const [firstPartDurationMs, secondPartDurationMs, midnightMs] = compareAndSplitTimestamps(screenOnTimestamp, screenOffTimestamp, langCode);

  const screenOnDate = formatDateFromMs(screenOnMs, langCode);
  const screenOffDate = formatDateFromMs(screenOffMs, langCode);

  const datesData = createDatesDataArray(screenOnDate, screenOffDate, firstPartDurationMs, secondPartDurationMs, screenOnMs, midnightMs, screenOffMs);

  datesData.forEach(({ date, durationMs, screenOnMs, screenOffMs }) => {
    updateDataForDate(data, date, durationMs, screenOnMs, screenOffMs, langCode);
  });

  return data;
}

usageData = updateDataWithDuration(usageData, screenOnTimestamp, screenOffTimestamp, languageCode);

var json_data = JSON.stringify(usageData, null, 2);

console.log(json_data)
console.log([total_hours, total_unlocks])