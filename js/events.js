function handleToggleMenu(){
  sidebar.classList.toggle("active");
}
menuToggle.addEventListener("change", handleToggleMenu)

function handleThemeSwitch() {
  themeSwitch.classList.toggle("dark");

  settings.isDarkMode = !settings.isDarkMode;
  environment.saveSettings(settings);
  navigator.vibrate(30);
  
  applyTheme();
  generateCanvasChart();
}
themeSwitch.addEventListener("click", handleThemeSwitch)

function handleLanguageChange() {
  const selectedLanguage = selectLanguage.value;
  translateTextsOnPage(selectedLanguage);
  
  settings.languageCode = selectLanguage.value;
  environment.saveSettings(settings);
}
selectLanguage.addEventListener('change', handleLanguageChange);

async function handleCardClick(event) {
  const element = event.target;

  await sleep(200);

  if (element.hasAttribute("data-unlocks")) {
    graph.classList.add("hide")
    timeToday.parentNode.classList.add("hide")
    
    const date = element.getAttribute("data-unlocks");
    await renderSectionInfo(date, usageData[date]);
    
    checkAndTranslateText()
  } if (element.hasAttribute("data-delete")) {
    const date = element.getAttribute("data-delete");
    dateElement.textContent = dateElement.textContent.replace(/\d+\/\d+\/\d+/g, date);
    alertContainer.classList.add("active");
    selectedDay = date;
  }
}
cardsContainer.addEventListener("click", handleCardClick);

async function handleAlertClick(event) {
  const element = event.target;
  const action = element.getAttribute("data-alert");
  if (!action) return;

  const allowedActions = {
    async continue() {
      await sleep(250);

      delete usageData[selectedDay];
      renderDayCards();
      generateCanvasChart();
      updateTimeUsedToday();
      environment.updateData(usageData);
    },
    async cancel() {
      await sleep(250);
    },
    async overlay() {},
  };

  const func = allowedActions[action];
  if (!func) return;

  await func();
  alertContainer.classList.remove("active");
}
alertContainer.addEventListener("click", handleAlertClick);

async function handleSidebarClick(event) {
  const element = event.target;
  const isOverlay = element.hasAttribute("data-sidebar-overlay");
  if (isOverlay) {
    sidebar.classList.remove("active");
    menuToggle.checked = false
  }
}
sidebar.addEventListener("click", handleSidebarClick);