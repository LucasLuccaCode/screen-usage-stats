const defaultSettings = {
  isDarkMode: true,
  languageCode: 'pt'
}

const webEnvironment = {
  path: ".",
  timeToday: {
    screenOnMs: 1703752696000, // 05:38:16
    screenOffMs: 1703752696000, // 05:38:16
  },
  updateData(data) {
    console.log("Updating data...");
  },
  deleteSettings() {
    localStorage.removeItem('settings');
  },
  saveSettings(settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
  },
  loadSettings() {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      return JSON.parse(savedSettings)
    }
    return this.defaultSettings;
  },
  displayFlash(text) {
    alert(text)
  }
};