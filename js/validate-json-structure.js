var file_data = `{
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

const usageData = JSON.parse(file_data);

function isValidDate(dateString) {
  const dateRegex = /^\d+\/\d+\/\d+$/;
  return dateRegex.test(dateString);
}

function validateJsonStructure(jsonData) {
  const dates = Object.keys(jsonData);

  if (!dates.length || !isValidDate(dates[0])) {
    return false;
  }

  const dateKey = dates[0];
  const dateData = jsonData[dateKey];

  if (
    !dateData ||
    !dateData.totalHours ||
    !dateData.totalHoursMs ||
    !dateData.sections ||
    !Array.isArray(dateData.sections) ||
    dateData.sections.length === 0
  ) {
    return false;
  }

  for (const section of dateData.sections) {
    if (!section.screenOn || !section.screenOff || !section.duration) {
      return false;
    }
  }

  return true;
}

var is_valid_json = validateJsonStructure(usageData);
var json_data = JSON.stringify(usageData, null, 2)

console.log({ is_valid_json, json_data });