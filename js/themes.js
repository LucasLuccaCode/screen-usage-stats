const dark = {
  "name": "dark",
  "primary-color": "#191919",
  "secondary-color": "#1f1f1f",
  "details-color": "#5768ef",
  "container-color": "#191919",
  "box-shadow-card": "0 1px 2px 1px rgba(0,0,0, .05)",
  "base-rgb-details": "87, 104, 239",
  "base-rgb-opaque": "255, 255, 255",
  "text-color": "#efefff",
  "text-color-details": "#efefff",
  "button-bg-color": "transparent",
  "button-color": "rgba(87, 104, 239, .7)",
  "button-border": "rgba(87, 104, 239, .3)",
  "delete-icon-path": "url('../assets/delete-dark.png')",
  "unlock-icon-path": "url('../assets/unlock-dark.png')",
  "back-icon-path": "url('../assets/back-dark.png')"
}

const light = {
  "name": "light",
  "primary-color": "#f1f1f1",
  "secondary-color": "#fafafa",
  "details-color": "#6b8afd",
  "container-color": "#ffffff",
  "box-shadow-card": "0 1px 2px 1px rgba(0,0,0, .05)",
  "base-rgb-details": "107, 138, 253",
  "base-rgb-opaque": "0, 0, 0",
  "text-color": "#868690",
  "text-color-details": "#efefff",
  "button-bg-color": "rgba(87, 104, 239, .8)",
  "button-color": "#efefff",
  "button-border": "rgba(87, 104, 239, .05)",
  "delete-icon-path": "url('../assets/delete-light.png')",
  "unlock-icon-path": "url('../assets/unlock-light.png')",
  "back-icon-path": "url('../assets/back-light.png')"
}

async function applyTheme() {
  theme = settings.isDarkMode ? dark: light
  const root = document.documentElement;

  for (const [key, value] of Object.entries(theme)) {
    if (key !== "name") {
      root.style.setProperty(`--${key}`, value);
    }
  }

  if (!settings.isDarkMode) {
    themeSwitch.classList.remove("dark");
  }
}