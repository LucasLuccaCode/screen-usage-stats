async function start(){
  applyTheme();
  updateTimeUsedToday();
  updateGreeting()
  generateCanvasChart();
  await renderDayCards();
  checkAndTranslateText()
}
start()