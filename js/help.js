const selectLanguage = document.querySelector('.c-select__language');
const shortcuts = document.querySelector(".c-shortcuts");
const shortcutLinks = document.querySelectorAll(".c-shortcuts li a");
const main = document.querySelector(".c-main");
const header = document.querySelector(".c-header");

let theme = {}

const environment = typeof tasker === "undefined"
? webEnvironment: tasker;

const settings = environment.loadSettings()

// UTILS

function scrollToSection(targetOffset) {
  main.scroll({
    top: targetOffset,
    behavior: 'smooth'
  });
}

// EVENTS

function handleLanguageChange() {
  const selectedLanguage = selectLanguage.value;
  translateTextsOnPage(selectedLanguage);

  settings.languageCode = selectLanguage.value;
  environment.saveSettings(settings);
}
selectLanguage.addEventListener('change', handleLanguageChange);

function handleShortcutClick(event) {
  event.preventDefault();
  const clickedElement = event.target;
  const sectionId = clickedElement.getAttribute("href");
  const targetSection = document.querySelector(sectionId);
  const targetOffset = targetSection.offsetTop - header.offsetHeight - 10;

  scrollToSection(targetOffset);

  shortcutLinks.forEach(link => link.classList.remove("active"));
  clickedElement.classList.add("active");
}
shortcuts.addEventListener("click",
  handleShortcutClick);
  
// START
applyTheme()
checkAndTranslateText()