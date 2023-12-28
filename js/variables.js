const themeSwitch = document.querySelector("[data-theme-switch]");
const greeting = document.querySelector("[data-greeting]");
const timeToday = document.querySelector("[data-time-today]");
const graph = document.querySelector("[data-graph]");
const cardsContainer = document.querySelector("[data-cards]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const sidebar = document.querySelector("[data-sidebar-overlay]");
const alertContainer = document.querySelector("[data-alert]");
const dateElement = document.querySelector("[data-alert='date']");
const canvas = document.querySelector("[data-canvas]");
const selectLanguage = document.querySelector("[data-select-language]");

const usageData = data;
let theme = {}
let selectedDay = null;

const environment = typeof tasker === "undefined" 
  ? webEnvironment 
  : tasker;

const settings = environment.loadSettings()
